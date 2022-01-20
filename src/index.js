module.exports = (options) => {
	/*
	// Check Node.js version
	if(parseFloat(process.version.slice(1)) < 16.9) {
		throw new Error(`[HoneyCord.js] For running HoneyCord.js, it is required to have Node.js 16.9 or newer.`);
	}
	*/

	// Require
	var fs = require(`fs`),
		path = require(`path`),
		Discord = require(`discord.js`);

	var Discord = Object.assign({}, Discord);

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
			this.src = require.resolve(`discord.js`).split(path.sep).slice(0, -1).join(path.sep);
			this.Discord = Discord;
		}

		// require.cache[index].exports
		get(attr) {
			return this.Discord[attr];
		}

		set(attr, value) {
			return this.Discord[attr] = value;
		}

		extend(attr, callback) {
			return this.set(attr, callback(this.get(attr)));
		}

		// require.cache[file].exports
		resolve_extCache(route) {
			return path.join(this.src, route.join(path.sep));
		}
		
		get_extCache(route) {
			var fullPath = this.resolve_extCache(route);

			return require.cache[fullPath].exports;
		}

		set_extCache(route, value) {
			var fullPath = this.resolve_extCache(route);

			return require.cache[fullPath].exports = value;
		}

		extend_extCache(route, callback) {
			return this.set_extCache(route, callback(this.get_extCache(route)));
		}

		// Get arguments
		getArgs(args) {
			return args.map(x => {
				if(x._type) return x;
				
				x = {
					value: x,
					_type: x.constructor.name,
				};

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
	for(var patch of patches) {
		options[patch] = options[patch] || true;

		if(options[patch] == true && fs.existsSync(path.join(__dirname, `patches`, patch))) {
			require(path.join(__dirname, `patches`, patch))(extendables);
		}
	}

	var index = require.resolve(`discord.js`);
	return require.cache[index].exports = Discord;
};
