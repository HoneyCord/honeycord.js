module.exports = (path, Discord, srcPath) => {
	const files = require(`fs`)
		.readdirSync(path.join(__dirname, `patches`, `v13`))
		.filter(x => (/\.js$/gi).test(x))

	for(const file of files) {
		require(path.join(__dirname, `patches`, `v13`, file))(path, Discord, srcPath);
	}

	// Replace require cache
	require.cache[path.join(srcPath, `index.js`)].exports = Discord;
};
