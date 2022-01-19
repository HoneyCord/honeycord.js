module.exports = extendables => {
	extendables.extend(`MessageEmbed`, ExtendableMessageEmbed => {
		class MessageEmbed extends ExtendableMessageEmbed {
			// <MessageEmbed>.setAuthor
			setAuthor(options, iconURL, url) {
				if(typeof options == `string`) {
					var options = {
						name: options,
						iconURL,
						url,
					};
				}

				return super.setAuthor(options);
			}
			
			// <MessageEmbed>.setFooter
			setFooter(options, iconURL) {
				if(typeof options == `string`) {
					var options = {
						text: options,
						iconURL,
					};
				}

				return super.setFooter(options);
			}
		}
		
		
		return MessageEmbed;
	});
};
