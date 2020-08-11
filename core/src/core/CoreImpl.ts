import { CoreHandler } from "./Core";
import { botConfig } from "../env/botConfig";


export class CoreImpl implements CoreHandler {
    public attachEvents(client) {
        client.addListener("message", function(from, to, text, message) {
            if (botConfig.botName === to) {
                // pm
                client.say(from, 'Hola');
            } else {
                // channel
                const channel = to;
                if (text.indexOf(botConfig.botName) >= 0) {
                    client.say(to, 'Hola, jejeje');
                    // o al privado de la persona con:
                    // bot.say(from, 'Hola jijiji');
                }
            }
            console.log(from + '=>' + to + ':' + text);
            // bot.say(config.channels[0], "¿Public que?");
        });
    }
}