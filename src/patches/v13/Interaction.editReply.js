module.exports = (path, Discord, srcPath) => {
	var origEditReply = Discord.CommandInteraction.prototype.editReply;

	Discord.CommandInteraction.prototype.editReply = async function reply(...args) {
		const options = require(path.join(__dirname, `..`, `..`, `resolve.js`))(Discord, `message`, args);

		if(options.code) {
			options.content = Discord.Formatters.codeBlock(options.code, options.content);
		}

		return origEditReply.call(this, options);
	};
};
