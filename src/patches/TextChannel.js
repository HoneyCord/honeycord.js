module.exports = extendables => {
	extendables.extend_extCache([`structures`, `TextChannel.js`], ExtendableTextChannel => {
		class TextChannel extends ExtendableTextChannel {
			send(...args) {
				var options = {
					embeds: [],
					components: [],
					files: [],
				};
				
				var args = extendables.getArgs(args);

				for(var arg of args) {
					switch(arg._type) {
						case `String`: {
							options.content = arg.value;
							break;
						};
						
						case `MessageEmbed`: {
							options.embeds.push(arg.value);
							break;
						};

						case `MessageAttachment`: {
							options.files.push(arg.value);
							break;
						};

						case `MessageActionRow`: {
							options.components.push(arg.value);
							break;
						};

						case `MessageButton`: {
							if(options.components.length < 1) {
								options.components.push(
									new extendables.Discord.MessageActionRow()
								);
							}

							for(var i=0; i<options.components.length; i++) {
								if(options.components[i].components.length < 5) {
									options.components[i].addComponents(arg.value);
									break;
								}
							}
							
							break;
						};

						case `Object`: {
							options = { ...options, ...arg.value };
							break;
						};
					}
				}

				return super.send(options);
			}
		}
		
		return TextChannel;
	});
};
