import { QuotesAdapter } from './../database/quotes/quotes.adapter';
import { Injectable, Logger } from '@nestjs/common';
import { botCFG } from 'src/environment/bot';
import { CommandsAdapter, FiltersOpt } from 'src/database/commands/commands.adapter';
import * as irc from 'irc';
import { VariableAdapter } from 'src/database/variables/variable.adapter';
import { Quotes } from 'src/database/quotes/quotes.entity';
import { HistoryAdapter } from 'src/database/history/history.adapter';

@Injectable()
export class CoreService {

    private readonly logger = new Logger(CoreService.name);

    private client;
    private channelsNicks = {};

    constructor(
        private commandAdp: CommandsAdapter,
        private variableAdp: VariableAdapter,
        private quoteAdp: QuotesAdapter,
        private historyAdp: HistoryAdapter
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
                        // responses.forEach(response => {
                            // console.log('OUT: ', response, from);
                            this.client.say(from, responses);
                        // });
                    }
                });
            } else { // channel
                if (text.indexOf(botCFG.botName) >= 0) { // mention
                    this.getResponseFromMessage(from, to, text.replace(botCFG.botName, '')).then(responses => {
                        if(responses) {
                            // responses.forEach(response => {
                                this.client.say(to, responses);
                            // })
                        }
                    })
                }
            }
            this.logger.log(from + ' => ' + to + ': ' + text);
            this.historyAdp.add(from, to, text);
        });
        this.client.addListener('nick', (oldnick, newnick, channels, message) => {
            if(oldnick == botCFG.botName) {
                botCFG.botName = newnick;
            }
        });
        this.client.addListener('names', (channel, nicks) => {
            this.channelsNicks[channel.slice(1)] = nicks;
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
        this.client.addListener('error', function(message) {
            console.log('error: ', message);
        });
    }

    private async getResponseFromMessage(fromUser: string, targetChannel: string, text: string): Promise<string> {
        const filters = new FiltersOpt();
        filters.fromUser = fromUser.toLocaleLowerCase();
        filters.targetChannel = targetChannel.toLocaleLowerCase();
        let outNormals = [];
        let outRelevants = [];
        let data = await this.commandAdp.getCommands(filters);
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
                        if(cmd.fromuser) {
                            outRelevants.push(r);
                        } else {
                            outNormals.push(r);
                        }
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
                    if(cmd.fromuser) {
                        outRelevants.push(r);
                    } else {
                        outNormals.push(r);
                    }
                }
            }
        }

        let out;
        if(outRelevants.length > 0) {
            out = outRelevants;
        } else {
            out = outNormals;
        }
        
        if(out.length == 0) {
            this.client.say(fromUser, 'Oops, no te entiendo :(, si queres ayuda escribí !ayuda');
            return;
        } else {
            if(out.length > 1) {
                return out[Math.floor(Math.random() * out.length)];
            } else {
                return out[0];
            }
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
            >>quote$1 = crear quote :: quote (.+)$
            *{sno} (si o no)
            *{rnd} nick random del canal
            *{d10} dice 10
        */
        const rx = new RegExp(command, "gi");
        const res = rx.exec(input);
        if (res) {
            const command = />>([a-zA-Z]+)\$([0-9]+)/gi.exec(response);
            if(command) {
                if(envData.owners.indexOf(envData.user.toLowerCase()) >= 0) {
                    response = response.replace(command[0], '').trim();
                    if(command[1] === 'join') {
                        this.client.join(res[command[2]]);
                        return 'Ok';
                    }
                    if(command[1] === 'part') {
                        this.client.part(res[command[2]]);
                        return 'Ok';
                    }
                    if(command[1] === 'kick') {
                        
                    }
                    if(command[1] === 'ban') {
                        
                    }
                    if(command[1] === 'quote') {
                        const q = await this.quoteAdp.add(res[command[2]], envData.channel, envData.user);
                        return 'Quote realizado: ' + q.identifiers[0].id_quote;
                    }
                } else {
                    this.logger.debug(envData.user);
                    this.logger.debug(envData.owners);
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
            const sn = response.match(/\*{sno}/g);
            if(sn) {
                const ysn = Math.random() > 0.5 ? 'si' : 'no';
                response = response.replace('*{sno}', ysn);
            }
            const dice = response.match(/\*{d[0-9]+}/g);
            if(dice) {
                const diceNumber = parseInt(/\*{d([0-9]+)}/.exec(dice[0])[1]);
                const result = Math.floor(Math.random() * diceNumber) + 1;
                response = response.replace(dice[0], ''+result);
            }
            const rnd = response.match(/\*{rnd}/g);
            if(rnd) {
                const usersInChannel = Object.entries(this.channelsNicks[envData.channel.slice(1)]);
                response = response.replace('*{rnd}', usersInChannel[Math.floor(Math.random()*(usersInChannel.length))][0]);
            }
            // QUOTES
            let quote = response.match(/\*{quote}/g);
            let quoteNro = -1;
            if(!quote) {
                const composed = /\*{quote=([0-9]+)}/g.exec(response);
                quote = composed;
                if(composed) {
                    quoteNro = parseInt(composed[1]);
                }
            }
            if(quote) {
                let quote: Quotes;
                if(quoteNro > 0) {
                    quote = await this.quoteAdp.getRepository().findOne(quoteNro)
                } else {
                    quote = await this.quoteAdp.getRepository().findOne();
                }
                response = '<'+quote.channel+'|' + quote.quoteado.getDate() + '-' + (quote.quoteado.getMonth() + 1) + '-' + quote.quoteado.getFullYear() + '> ' + quote.quote;
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
        this.client.send('NICK', nick);
    }
    
    public sendRaw(command: string) {
        const res = this.client.send(...command.split(' '));
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