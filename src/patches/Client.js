module.exports = extendables => {
	extendables.extend(`Client`, ExtendableClient => {
		class Client extends ExtendableClient {
			constructor(options={}) {
				if(!options.intents) {
					options.intents = [
						extendables.Discord.Intents.FLAGS.DIRECT_MESSAGES,
						extendables.Discord.Intents.FLAGS.GUILDS,
						extendables.Discord.Intents.FLAGS.GUILD_MESSAGES,
					];
				}

				return super(options);
			}
		}

		return Client;
	});
};
