import { CoreHandler } from "./Core";
import { botConfig } from "../env/botConfig";
import { CommandsModel, FiltersOpt } from "../database/CommandsModel";
import { VariableModel } from "../database/VariableModel";

export class CoreImpl implements CoreHandler {

    private commandsModel: CommandsModel;
    private varModel: VariableModel;
    private client;

    constructor() {
        this.commandsModel = CommandsModel.getInstance();
        this.varModel = VariableModel.getInstance();
    }

    public attachEvents(client) {
        this.client = client;
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
                    this.getResponseFromMessage(from, to, text.replace(botConfig.botName, '')).then(responses => {
                        responses.forEach(response => {
                            client.say(to, response);
                        })
                    })
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
        for(const cmd of data) {
            const context = targetChannel === 'PIRVMSG' ? 'all' : targetChannel;
            let multiResp;
            try {
                multiResp = JSON.parse(cmd.response);
            } catch(e) {}
            if(multiResp) {
                for(const response of multiResp) {
                    const r = await this.processMessage(cmd.command, response, text, {
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
            } else {
                const r = await this.processMessage(cmd.command, cmd.response, text, {
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
        }
        if(out.length == 0) {
            out.push('Ups no te entiendo, ejecuta el comando !help para ver una ayuda o !help comando para ver ayuda sobre un comando específico');
        }
        return out;
    }

    private async processMessage(command: string, response: string, input: string, envData: EnvData) {
        /* 
            @{algo} = variable por usuario 
            #{algo} = variable por canal 
            $1 grupo 1 de la regex 
            %{user} = usuario que habla
            %{channel} = canal que habla
            %{nick} = nick del bot
            %{owners} = lista de owners
            %{context} = contexto de guardado para variables
            >>join$1 = unirse a $1 del mensaje :: unite a (#[a-zA-Z0-9_]+)
            >>part$1
            >>kick$1
            >>ban$1
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
                for(const vr of vars) {
                    const variable = /(\#|\@){([a-zA-Z0-9_]+)((\+\+)?|(\-\-)?)}/.exec(vr);
                    const channelVar = variable[1] == '#';
                    const vname = variable[2];
                    const modificador = variable[3];
                    const varChannel = envData.context;
                    const varUser = channelVar ? 'all' : envData.user;
                    let varVal;
                    if(modificador === '++') {
                        varVal = await this.varModel.incrementVariable(varChannel, varUser, vname);
                    } else if(modificador === '--') {
                        varVal = await this.varModel.decrementVariable(varChannel, varUser, vname);
                    } else {
                        varVal = await this.varModel.findVariable(varChannel, varUser, vname);
                    }
                    response = response.replace(vr, varVal);
                }
            }
            const envs = response.match(/\%{([a-zA-Z0-9_]+)}/g);
            if(envs) {
                envs.forEach(r => {
                    const enVar = /\%{([a-zA-Z0-9_]+)}/.exec(r);
                    response = response.replace(r, envData[enVar[1]]);
                })
            }
            const command = />>([a-zA-Z]+)\$([0-9]+)/gi.exec(response);
            if(command) {
                if(envData.owners.indexOf(envData.user) > 0) {
                    response = response.replace(command[0], '').trim();
                    if(command[1] === 'join') {
                        this.client.join(res[command[2]]);
                    }
                    if(command[1] === 'part') {
                        this.client.part(res[command[2]]);
                    }
                    if(command[1] === 'kick') {
                        
                    }
                    if(command[1] === 'ban') {
                        
                    }
                } else {
                    return 'Tu a mi no me mandas. :fu:';
                }
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