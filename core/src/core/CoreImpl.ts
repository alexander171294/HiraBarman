import { CoreHandler } from "./Core";
import { botConfig } from "../env/botConfig";
import { CommandsModel, FiltersOpt } from "../database/CommandsModel";

export class CoreImpl implements CoreHandler {

    private commandsModel: CommandsModel;

    private memory: any = {}; // pasar a base de datos

    constructor() {
        this.commandsModel = CommandsModel.getInstance();
    }

    public attachEvents(client) {
        client.addListener("message", (from, to, text, message) => {
            if (botConfig.botName === to) { // pm
                this.getResponseFromMessage(from, 'PRIVMSG', text).then(responses => {
                    responses.forEach(response => {
                        console.log('OUT: ', response, from);
                        client.say(from, response);
                    });
                });
            } else { // channel
                if (text.indexOf(botConfig.botName) >= 0) { // mention
                    client.say(to, this.getResponseFromMessage(from, to, text.replace(botConfig.botName, '')));
                }
            }
            console.log(from + '=>' + to + ':' + text);
        });
    }

    private async getResponseFromMessage(fromUser: string, targetChannel: string, text: string): Promise<string[]> {
        const filters = new FiltersOpt();
        filters.fromUser = fromUser;
        filters.targetChannel = targetChannel;
        let out = [];
        const data = await this.commandsModel.getCommands(filters);
        data.forEach(cmd => {
            const context = targetChannel === 'PIRVMSG' ? fromUser : targetChannel;
            let multiResp;
            try {
                multiResp = JSON.parse(cmd.response);
            } catch(e) {}
            if(multiResp) {
                multiResp.forEach(response => {
                    const r = this.processMessage(cmd.command, response, text, {
                        context,
                        user: fromUser,
                        channel: targetChannel,
                        nick: botConfig.botName,
                        owners: botConfig.owners
                    });
                    if(r) {
                        out.push(r);
                    }
                });
            } else {
                const r = this.processMessage(cmd.command, cmd.response, text, {
                    context,
                    user: fromUser,
                    channel: targetChannel,
                    nick: botConfig.botName,
                    owners: botConfig.owners
                });
                if(r) {
                    out.push(r);
                }
            }
        });
        if(out.length == 0) {
            out.push('Ups no te entiendo, ejecuta el comando !help para ver una ayuda o !help comando para ver ayuda sobre un comando específico');
        }
        return out;
    }

    private processMessage(command: string, response: string, input: string, envData: EnvData) {
        /* 
            @{algo} = variable por usuario 
            #{algo} = variable por canal 
            $1 grupo 1 de la regex 
            %{user} = usuario que habla
            %{channel} = canal que habla
            %{nick} = nick del bot
            %{owners} = lista de owners
            %{context} = contexto de guardado para variables
        */
        const rx = new RegExp(command, "gi");
        const res = rx.exec(input)
        if (res) {
            console.log('Match regex: ', res);
            const groups = response.match(/\$[0-9]+/g);
            if (groups) {
                groups.forEach(p => {
                    const value = p.slice(1);
                    response = response.replace(p, res[value]);
                });
            }
            const vars = response.match(/(\#|\@){([a-zA-Z0-9_]+)((\+\+)?|(\-\-)?)}/g);
            if (vars) {
                vars.forEach(vr => {
                    const variable = /(\#|\@){([a-zA-Z0-9_]+)((\+\+)?|(\-\-)?)}/.exec(vr);
                    const siContext = variable[1] == '#';
                    const vname = variable[2];
                    const modificador = variable[3];
                    if(modificador === '++') {
                        if(!this.memory[vname]) {
                            this.memory[vname] = 0;
                        }
                        this.memory[vname] = parseInt(this.memory[vname], 10)+1;
                    }
                    if(modificador === '--') {
                        if(!this.memory[vname]) {
                            this.memory[vname] = 0;
                        }
                        this.memory[vname] = parseInt(this.memory[vname], 10)-1;
                    }
                    response = response.replace(vr, this.memory[vname]);
                });
            }
            const envs = response.match(/\%{([a-zA-Z0-9_]+)}/g);
            if(envs) {
                envs.forEach(r => {
                    const enVar = /\%{([a-zA-Z0-9_]+)}/.exec(r);
                    response = response.replace(r, envData[enVar[1]]);
                })
            }
            return response;
        }
        return;
    }
}

export interface EnvData {
    context: string,
    user: string,
    channel: string,
    nick: string,
    owners: string[]
}