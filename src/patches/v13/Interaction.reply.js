module.exports = (path, Discord, srcPath) => {
	var origReply = Discord.CommandInteraction.prototype.reply;

	Discord.CommandInteraction.prototype.reply = async function reply(...args) {
		const options = require(path.join(__dirname, `..`, `..`, `resolve.js`))(Discord, `message`, args);

		if(args.some(x => typeof x == `boolean`)) {
			options.ephemeral = args.filter(x => typeof x == `boolean`)[0];
		}

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
			await this.deferReply({
				ephemeral: options.ephemeral,
			}).catch(()=>{});

			const promises = [];

			for(var i=0; i<slices.length; i++) {
				if(i == 0) {
					promises.push(this.followUp({
						content: slices.at(i),
						ephemeral: options.ephermeral,
					}));
				} else if(i == slices.length - 1) {
					promises.push(this.followUp({
						...options,
						content: slices.at(i),
					}));
				} else {
					promises.push(this.followUp({
						content: slices.at(i),
						ephemeral: options.ephermeral,
					}));
				}
			}

			return Promise.all(promises);
		}
	};
};
