module.exports = (path, Discord, srcPath) => {
	/**
	 * The main hub for interacting with the Discord API, and the starting point for any bot.
	 * @extends {BaseClient}
	 */
	class Client extends Discord.Client {
		/**
		 * @param {ClientOptions} [options] Options for the client
		 */
		constructor(options={}) {
			if(!options) {
				var options = {};
			}

			if(!options.intents) {
				options.intents = [
					Discord.Intents.FLAGS.GUILDS,
				];
			}
			
			if(typeof options !== `object`) throw new TypeError(`ClientOptions must be an Object, nor ${options?.constructor?.name || typeof options}.`);

			super(options);
		}
	}

	Discord.Client = Client;
};
