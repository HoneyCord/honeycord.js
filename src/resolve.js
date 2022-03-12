function resolve(Discord, type, args) {
	var options = {};
	
	switch(type) {
		case `message`: {
			Object.assign(options, {
				embeds: [],
				components: [],
				files: [],
			});

			for(const arg of args) {
				// String (Message Content)
				if(typeof arg == `string`) {
					options.content = `${(options.content ?? ``)}${arg}`;
					continue;
				}

				if(typeof arg !== `object`) continue; // If arg is not an Object, just ignore it.

				// MessageEmbed
				if(arg instanceof Discord.MessageEmbed) {
					options.embeds.push(arg);
					continue;
				}

				// MessageAttachment
				if(arg instanceof Discord.MessageAttachment) {
					options.files.push(arg);
					continue;
				}

				// MessageActionRow
				if(arg instanceof Discord.MessageActionRow) {
					options.components.push(arg);
					continue;
				}

				// MessageButton
				if(arg instanceof Discord.MessageButton) {
					var cont = false;
					
					for(var i=0; i<options.components.length; i++) {
						if(options.components.at(i).length < 5) {
							options.components.at(i).addComponents(arg);
							cont = true;
						}
					}

					if(cont) continue;
					
					options.components.push(
						new Discord.MessageActionRow()
							.addComponents(arg)
					);
				}

				// MessageSelectMenu
				if(arg instanceof Discord.MessageSelectMenu) {
					var cont = false;
					
					for(var i=0; i<options.components.length; i++) {
						if(options.components.at(i).length < 5) {
							options.components.at(i).addComponents(arg);
							cont = true;
							break;
						}
					}

					if(cont) continue;
					
					options.components.push(
						new Discord.MessageActionRow()
							.addComponents(arg)
					);
				}

				// Merge object
				options = Object.assign({}, arg, options);
			}

			return options;
		};
	}
}

module.exports = resolve;
