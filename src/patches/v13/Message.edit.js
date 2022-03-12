module.exports = (path, Discord, srcPath) => {
	var origEdit = Discord.Message.prototype.edit;

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
	/**
	 * Edits the content of the message.
	 * @param {String|MessagePayload|MessageEditOptions} options The options to provide
	 * @returns {Promise<Message>}
	 * @example
	 * // Update the content of a message
	 * message.edit('This is my new content!')
	 * 	.then(msg => console.log(`Updated the content of a message to ${msg.content}`))
	 * 	.catch(console.error);
	 */
	Discord.Message.prototype.edit = async function edit(...args) {
		const options = require(path.join(__dirname, `..`, `..`, `resolve.js`))(Discord, `message`, args);

		if(options.code) {
			options.content = Discord.Formatters.codeBlock(options.code, options.content);
		}

		return origEdit.call(this, options);
	};
};
