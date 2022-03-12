module.exports = (path, Discord, srcPath) => {
	var origReply = Discord.Message.prototype.reply;

	/**
	 * Send an inline reply to this message.
	 * @param {...string|MessagePayload|ReplyMessageOptions} args The options to provide
	 * @returns {Promise<Message>}
	 * @example
	 * // Reply to a message
	 * message.reply('This is a reply!')
	 * 	.then(() => console.log(`Replied to message "${message.content}"`))
	 * 	.catch(console.error);
	 */
	Discord.Message.prototype.reply = async function reply(...args) {
		const options = require(path.join(__dirname, `..`, `..`, `resolve.js`))(Discord, `message`, args);

		options._byPass = `<zZz>`;

		var slices;
			
		if(options.split) {
			if(!isNaN(options.split?.maxLength) && parseInt(options.split?.maxLength) >= 1974 && options.code !== undefined) {
				options.split.maxLength = 1974;
			}
			
			slices = Discord.Util.splitMessage(options.content, options.split);
		}

		if(options.code) {
			if(slices) {
				slices = slices.map(x => Discord.Formatters.codeBlock(options.code, x));
			} else {
				options.content = Discord.Formatters.codeBlock(options.code, options.content);
			}
		}

		if(!slices) {
			return origReply.call(this, options);
		} else {
			const promises = [];

			for(var i=0; i<slices.length; i++) {
				if(i == 0) {
					promises.push(origReply.call(this, {
						content: slices.at(i),
					}));
				} else if(i == slices.length - 1) {
					promises.push(this.channel.send({
						...options,
						content: slices.at(i),
					}));
				} else {
					promises.push(this.channel.send({
						content: slices.at(i),
					}));
				}
			}

			return Promise.all(promises);
		}
	};
};
