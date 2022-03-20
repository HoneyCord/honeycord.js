module.exports = (path, Discord, srcPath) => {
	/**
	 * A link to the user's banner.
	 * <info>This method ~~will throw an error if called before the user is force fetched.~~ Will work :)
	 * @param  {...ImageURLOptions|Boolean|Number|String} [args={}] Options or parameters for the Image URL
	 * @returns {String}
	 */
	Discord.User.prototype.displayBannerURL = function displayBannerURL(...args) {
		const options = args.filter(x => typeof x == `object`)[0] || {
			dynamic: args.filter(x => typeof x == `boolean`)[0] ?? true,
			size: parseInt(args.filter(x => typeof x == `number`)[0]),
			format: args.filter(x => typeof x == `string`)[0] || `webp`,
		};

		options.size = isNaN(options.size)
			? 32
			: Math.abs(options.size);
		
		options.size = options.size > 400 ? 400 : options.size;

		if(!this.banner) {
			const w = options.size || 32,
				h = Math.trunc(w / 2.5) || 12,
				color = typeof this.accentColor == `number`
					? this.accentColor
					: (this.id % 0xffffff);

			return `https://singlecolorimage.com/get/${color.toString(16).padStart(6, `0`)}/${w}x${h}.png`;
		}
		
		return this.bannerURL(options);
	};
};
