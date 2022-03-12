module.exports = (path, Discord, srcPath) => {
	/**
	 * Attempts to join this voice channel.
	 * (module '@discordjs/voice' must be installed)
	 * @returns {Promise<VoiceConnection}
	 * @example
	 * // Join a voice channel
	 * voiceChannel.join()
	 * 	.then(connection => console.log('Connected!'))
	 * 	.catch(console.error);
	 */
	Discord.VoiceChannel.prototype.join = function join() {
		return new Promise(async(resolve, reject) => {
			if (!this.guild) return reject(new Error(`GUILD_NOT_CACHED`));
			if (!this.id) return reject(new Error(`CHANNEL_NOT_CACHED`));

			try {
				require.resolve(`@discordjs/voice`);
			} catch(err) {
				return reject(err);
			}

			const discordVoice = require(`@discordjs/voice`);

			try {
				return resolve(discordVoice.joinVoiceChannel({
					adapterCreator: this.guild.voiceAdapterCreator,
					guildId: this.guild.id,
					channelId: this.id,
				}));
			} catch(err) {
				return reject(err);
			}
		});
	};

	/**
	 * Leaves this voice channel.
	 * (module '@discordjs/voice' must be installed)
	 * @example
	 * // Leave a voice channel
	 * voiceChannel.leave()
	 * 	.catch(console.error);
	 */
	Discord.VoiceChannel.prototype.leave = function leave() {
		if(!this.guildId) return;

		try {
			require.resolve(`@discordjs/voice`);
		} catch(err) {
			return;
		}

		const discordVoice = require(`@discordjs/voice`);

		const connection = discordVoice.getVoiceConnection(this.guildId);
		if(!connection) return;

		return connection.destroy();
	};
};
