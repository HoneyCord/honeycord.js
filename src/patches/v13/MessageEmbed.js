module.exports = (path, Discord, srcPath) => {
	class MessageEmbed extends Discord.MessageEmbed {
		/**
		 * Sets the author of this embed.
		 * @param {String|EmbedAuthorData|null} options The options to provide for the author.
		 * Provide `null` to remove the author data.
		 * @param {String} [iconURL] The icon URL of this author.
		 * @param {String} [url] The URL of this author.
		 * @param {String} [proxyIconURL] The proxy icon URL of this author.
		 * @returns {MessageEmbed}
		 */
		setAuthor(options, iconURL, url, proxyIconURL) {
			if(typeof options == `string` || typeof iconURL == `string` || typeof url == `string` || typeof proxyIconURL == `string`) {
				var options = {
					name: options,
					iconURL: iconURL,
					url: url,
					proxyIconURL: proxyIconURL,
				};
			}

			return super.setAuthor(options);
		}
		
		/**
		 * Sets the footer of this embed.
		 * @param {String|EmbedFooterData|null} options The options to provide for the footer.
		 * Provide `null` to remove the footer data.
		 * @param {String} [iconURL] The icon URL of this footer.
		 * @param {String} [proxyIconURL] The proxy icon URL of this footer.
		 * @returns {MessageEmbed}
		 */
		setFooter(options, iconURL, proxyIconURL) {
			if(typeof options == `string` || typeof iconURL == `string` || typeof proxyIconURL == `string`) {
				var options = {
					text: options,
					iconURL: iconURL,
					proxyIconURL: proxyIconURL,
				};
			}

			return super.setFooter(options);
		}
	}

	Discord.MessageEmbed = MessageEmbed;
};
