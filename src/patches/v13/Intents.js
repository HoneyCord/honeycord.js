module.exports = (path, Discord, srcPath) => {
	if(!Discord.Intents.FLAGS.ALL) {
		Discord.Intents.FLAGS.ALL = Object.values(Discord.Intents.FLAGS).reduce((x, y) => x + y);
	}
};
