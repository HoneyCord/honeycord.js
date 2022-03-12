module.exports = (path, Discord, srcPath) => {
	function doThings(args, f) {
		const options = require(path.join(__dirname, `..`, `..`, `resolve.js`))(Discord, `message`, args);

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
			return f.call(this, options);
		} else {
			const promises = [];

			for(var i=0; i<slices.length; i++) {
				if(i == 0) {
					promises.push(f.call(this, {
						content: slices.at(i),
					}));
				} else if(i == slices.length - 1) {
					promises.push(f({
						...options,
						content: slices.at(i),
					}));
				} else {
					promises.push(f({
						content: slices.at(i),
					}));
				}
			}

			return Promise.all(promises);
		}
	}

	/**
	 * Sends a message to this channel.
	 * @param {...string|MessagePayload|MessageOptions} args The options to provide
	 * @returns {Promise<Message>}
	 * @example
	 * // Send a basic message
	 * channel.send('hello!')
	 * 	.then(message => console.log(`Sent message: ${message.content}`))
	 * 	.catch(console.error);
	 * @example
	 * // Send a remote file
	 * channel.send({
	 * 	files: ['https://cdn.discordapp.com/icons/222078108977594368/6e1019b3179d71046e463a75915e7244.png?size=2048']
	 * })
	 * 	.then(console.log)
	 * 	.catch(console.error);
	 * @example
	 * // Send a local file
	 * channel.send({
	 * 	files: [{
	 * 		attachment: 'entire/path/to/file.jpg',
	 * 		name: 'file.jpg',
	 * 		description: 'A description of the file'
	 * 	}]
	 * })
	 * 	.then(console.log)
	 * 	.catch(console.error);
	 * @example
	 * // Send an embed with a local image inside
	 * channel.send({
	 * 	content: 'This is an embed',
	 * 	embeds: [
	 * 		{
	 * 			thumbnail: {
	 * 				url: 'attachment://file.jpg'
	 * 			}
	 * 		}
	 * 	],
	 * 	files: [{
	 * 		attachment: 'entire/path/to/file.jpg',
	 * 		name: 'file.jpg',
	 * 		description: 'A description of the file'
	 * 	}]
	 * })
	 * 	.then(console.log)
	 * 	.catch(console.error);
	 */

	/*
	Discord.TextChannel.prototype.send = async function send(...args) {
		return doAll(args, TextChannelSend);
	};
	*/

	const toReplace = [
		`BaseGuildTextChannel`,
		`DMChannel`,
		`GuildMember`,
		`ThreadChannel`,
		`User`,
	];

	for(const name of toReplace) {
		const f = Discord[name].prototype.send;

		Discord[name].prototype.send = function send(...args) {
			if(args.at(0)?.options?._byPass == `<zZz>`) return f.call(this, ...args);
			return doThings.call(this, args, f);
		};
	}
};
