export const botCFG = {
	// "channels": ["#harkolandia", "#caballeros"],
	"channels": process.env.BOT_CHANNELS ? process.env.BOT_CHANNELS.split(',') : [
		"#LaTaberna"
	],
	"server": process.env.BOT_SERVER ? process.env.BOT_SERVER : 'irc.hirana.net',
	"botName": process.env.BOT_NAME ? process.env.BOT_NAME : 'BarmanBot',
	"owners": process.env.BOT_OWNERS ? process.env.BOT_OWNERS.split(',') : [
		'alex',
		'maguito',
		'gabriela-'
	]
};