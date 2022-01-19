module.exports = extendables => {
	extendables.extend_extCache([`structures`, `VoiceChannel.js`], ExtendableVoiceChannel => {
		class VoiceChannel extends ExtendableVoiceChannel {
			// <VoiceChannel>.join
			async join() {
				return new Promise(async(resolve, reject) => {
					if (!this.guild) return reject(new Error(`GUILD_NOT_CACHED`));
					if (!this.id) return reject(new Error(`CHANNEL_NOT_CACHED`));

					try {
						require.resolve(`@discordjs/voice`);
					} catch(err) {
						return reject(err);
					}

					var discordVoice = require(`@discordjs/voice`);

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
			}

			async leave() {
				return new Promise(async(resolve, reject) => {
					if (!this.guildId) return reject(new Error(`GUILD_NOT_CACHED`));

					try {
						require.resolve(`@discordjs/voice`);
					} catch(err) {
						return reject(err);
					}

					var discordVoice = require(`@discordjs/voice`);

					var connection = discordVoice.getVoiceConnection(this.guildId);
					if(!connection) return resolve();

					return resolve(connection.destroy());
				});
			}
		}
		
		return VoiceChannel;
	});
};
