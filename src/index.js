module.exports = (options) => {
	// Check Node.js version
	if(parseFloat(process.version.slice(1)) < 16.9) {
		throw new Error(`[HoneyCord.js] For running HoneyCord.js, it is required to have Node.js 16.9 or newer.`);
	}

	// Require
	var fs = require(`fs`),
		path = require(`path`),
		Discord = require(`discord.js`);

	// Check Discord.js version
	if(parseInt(Discord.version) < 13) {
		throw new Error(`[HoneyCord.js] For running HoneyCord.js, it is required to have Discord.js 13... or newer.`);
	}

	if(Discord.honeycordJS) {
		console.warn(`[HoneyCord.js] HoneyCord.js was already started!`);
		return false;
	}

	Discord.honeycordJS = true;

	/////////////////////////
	// Class "Extendables" //
	/////////////////////////
	class Extendables {
		constructor() {
			this.Discord = Discord;
			this.src = require.resolve(`discord.js`).split(path.sep).slice(0, -1).join(path.sep);
			this.index = require.resolve(`discord.js`);
		}

		// require.cache[index].exports
		get_indexCache(attr) {
			return require.cache[this.index].exports[attr];
		}

		set_indexCache(attr, value) {
			return require.cache[this.index].exports[attr] = value;
		}

		extend_indexCache(attr, callback) {
			return this.set_indexCache(attr, callback(this.get_indexCache(attr)));
		}

		// require.cache[file].exports
		get_cacheFile(file) {
			return path.join(this.src, `${file}.js`);
		}
		
		get_cache(file) {
			return require.cache[this.get_cacheFile(file)].exports;
		}

		set_cache(file, value) {
			return require.cache[this.get_cacheFile(file)].exports = value;
		}

		extend_cache(file, callback) {
				return require.cache[this.get_cacheFile(file)].exports = callback(this.get_cache(file));
	}

		// Get arguments
		getArgs(args) {
			return args.map(x => {
				if(x._type) return;
				
				if(typeof x !== `object`) {
					x = {
						value: x,
					};
				}

				x._type = x.constructor.name;

				return x;
			});
		}

		// End of Extendables class //
	}

	var extendables = new Extendables();

	// Read and filter patches files
	var patches = fs.readdirSync(`${__dirname}${path.sep}patches`)
		.filter(file => /\.js$/g.test(file));

	// Check options object
	if(!options) {
		var options = {};
	}
	
	if(typeof options !== `object`) {
		throw new Error(`[HoneyCord.js] Options must be a Object.`);
	}

	// Load patches
	patches.forEach(patch => {
		options[patch] = options[patch] || true;

		if(options[patch] == true) {
			require(path.join(__dirname, `patches`, patch))(extendables);
		}
	});
};
