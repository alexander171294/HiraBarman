const irc = require("irc");
const config = require("./config.json");

const bot = new irc.Client(config.server, config.botName, {
	channels: config.channels
});

// Listen for any message, say to him/her in the room
bot.addListener("message", function(from, to, text, message) {
    if (config.botName === to) {
        // pm
        bot.say(from, 'Hola');
    } else {
        // channel
        const channel = to;
        if (text.indexOf(config.botName) >= 0) {
            bot.say(to, 'Hola, jejeje');
            // o al privado de la persona con:
            // bot.say(from, 'Hola jijiji');
        }
    }
    console.log(from + '=>' + to + ':' + text);
	// bot.say(config.channels[0], "¿Public que?");
});