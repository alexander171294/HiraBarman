import { Injectable } from '@nestjs/common';
import { botCFG } from 'src/environment/bot';
import { CommandsAdapter, FiltersOpt } from 'src/database/commands/commands.adapter';
import * as irc from 'irc';
import { VariableAdapter } from 'src/database/variables/variable.adapter';


@Injectable()
export class CoreService {

    private client;

    constructor(
        private commandAdp: CommandsAdapter,
        private variableAdp: VariableAdapter
    ) {
        this.client = new irc.Client(botCFG.server, botCFG.botName, {
            channels: botCFG.channels
        });
        this.attachEvents();
    }

    public attachEvents() {
        this.client.addListener("message", (from, to, text, message) => {
            if (botCFG.botName === to) { // pm
                this.getResponseFromMessage(from, 'PRIVMSG', text).then(responses => {
                    if(responses) {
                        responses.forEach(response => {
                            console.log('OUT: ', response, from);
                            this.client.say(from, response);
                        });
                    }
                });
            } else { // channel
                if (text.indexOf(botCFG.botName) >= 0) { // mention
                    this.getResponseFromMessage(from, to, text.replace(botCFG.botName, '')).then(responses => {
                        if(responses) {
                            responses.forEach(response => {
                                this.client.say(to, response);
                            })
                        }
                    })
                }
            }
            console.log(from + '=>' + to + ':' + text);
        });
        this.client.addListener('nick', (oldnick, newnick, channels, message) => {
            if(oldnick == botCFG.botName) {
                botCFG.botName = newnick;
            }
        });
        this.client.addListener('names', (channel, nicks) => {

        });
        this.client.addListener('join', (channel, nick, message) => {
            if(nick === botCFG.botName) {

            }
        });
        this.client.addListener('part', (channel, nick, reason, message) => {
            if(nick === botCFG.botName) {
                
            }
        });
        this.client.addListener('quit', (nick, reason, channels, message) => {

        });
        this.client.addListener('kick', (channel, nick, by, reason, message) => {

        });
        this.client.addListener('channellist', (channel_list) => {
            console.log('channel_list', channel_list);
        });

    }

    private async getResponseFromMessage(fromUser: string, targetChannel: string, text: string): Promise<string[]> {
        const filters = new FiltersOpt();
        filters.fromUser = fromUser;
        filters.targetChannel = targetChannel;
        let out = [];
        const data = await this.commandAdp.getCommands(filters);
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
                        nick: botCFG.botName,
                        owners: botCFG.owners
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
                    nick: botCFG.botName,
                    owners: botCFG.owners
                });
                if(r) {
                    out.push(r);
                }
            }
        }
        if(out.length == 0) {
            this.client.say(fromUser, 'no te entiendo bro, si queres ayuda escribí !ayuda');
            return;
        } else {
            return out;
        }
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
        const res = rx.exec(input);
        console.log(res);
        if (res) {
            const command = />>([a-zA-Z]+)\$([0-9]+)/gi.exec(response);
            if(command) {
                if(envData.owners.indexOf(envData.user.toLowerCase()) > 0) {
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
                    return 'Ok';
                } else {
                    return 'Tu a mi no me mandas. :fu:';
                }
            }
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
                        varVal = await this.variableAdp.incrementVariable(varChannel, varUser, vname);
                    } else if(modificador === '--') {
                        varVal = await this.variableAdp.decrementVariable(varChannel, varUser, vname);
                    } else {
                        varVal = await this.variableAdp.findVariable(varChannel, varUser, vname);
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
            return response;
        }
        return;
    }

    public send(chnl: string, str: string) {
        this.client.say(chnl, str);
    }

    public getChannels() {
        return this.client.chans;
    }

    public getNick() {
        return this.client.nick;
    }

    public setNick(nick: string) {
        this.client.send('NICK', nick)
    }
    
    public sendRaw(command: string) {
        this.client.send(...command.split(' '));
    }

    public join(channel: string) {
        this.client.join(channel);
    }

    public leave(channel: string) {
        this.client.part(channel);
    }

}

export interface EnvData {
    context: string,
    user: string,
    channel: string,
    nick: string,
    owners: string[]
}