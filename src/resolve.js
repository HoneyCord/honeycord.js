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

					continue;
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

					continue;
				}
				
				// Merge object
				Object.assign(options, arg, options);
			}

			// Detect `button` property
			if(options.button) {
				var contButton = false;

				for(var i=0; i<options.button; i++) {
					if(options.components.at(i).length < 5) {
						options.components.at(i).addComponents(options.button);
						contButton = true;
					}
				}

				if(!contButton) {
					options.components.push(
						new Discord.MessageActionRow()
							.addComponents(options.button)
					);
				}
			}

			// Detect `embed` property
			if(options.embed) {
				if(Array.isArray(options.embed)) {
					options.embeds = options.embeds.concat(option.embed);
				} else {
					options.embeds.push(options.embed);
				}

				if(delete options.embed == false) options.embed = undefined;
			}

			// Detect `buttons` property
			if(options.buttons) {
				if(Array.isArray(options.buttons)) {
					var contButtons = false;
	
					for(var i=0; i<options.button; i++) {
						if(options.components.at(i).length < 5) {
							options.components.at(i).addComponents(options.button);
							contButtons = true;
						}
					}
	
					if(!contButtons) {
						options.components.push(
							new Discord.MessageActionRow()
								.addComponents(options.buttons)
						);
					}
				}

				if(delete options.buttons == false) options.buttons = undefined;
			}

			return options;
		};
	}
}

module.exports = resolve;
