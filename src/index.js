module.exports = (options) => {
	// Try to require Discord.js
	try {
		require(`discord.js`);
	} catch (err) {
		console.error(`[HoneyCord.js] Cannot load Discord.js:`);
		throw err;
	}

	// Require things
	const path = require(`path`),
		Discord = require(`discord.js`),
		srcPath = require.resolve(`discord.js`)
			.split(path.sep)
			.slice(0, -1)
			.join(path.sep);

	// Check Discord.js version
	if (Discord.version < `13`) {
		throw new RangeError(`[HoneyCord.js] Your version of Discord.js seems to be ${Discord.version}.\r\nYou need at least Discord.js v13 to run HoneyCord.js.`);
	}

	if (Discord.version > `14` && Discord.version < `15`) {
		require(path.join(__dirname, `patches`, `v14`, `main.js`))(Discord);
	}

	if (Discord.version > `15`) {
		console.warn(`[HoneyCord.js] The version of Discord.js appears to be ${Discord.version}.\r\nThis version of HoneyCord.js does not support that version, so bugs could occur at any time.`);
	}

	// Check HoneyCord.js attribute
	if (!Discord.honeycordJS) {
		Discord.honeycordJS = require(path.join(__dirname, `..`, `package.json`)).version;

		// Run patches
		require(path.join(__dirname, `loader.js`))(path, Discord, srcPath);
	}
};
