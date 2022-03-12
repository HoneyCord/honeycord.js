module.exports = (path, Discord, srcPath) => {
	var origDelete = Discord.Message.prototype.delete;

	/**
	 * Deletes the message.
	 * @param {Number} timeout How long to wait to delete the message in milliseconds
	 * @returns {Promise<Message>}
	 * @example
	 * // Delete a message
	 * message.delete()
	 * 	.then(msg => console.log(`Deleted message from ${msg.author.username}`))
	 * 	.catch(console.error);
	 */
	Discord.Message.prototype.delete = async function MessageDelete(timeout) {
		return new Promise(async(resolve, reject) => {
			if(!this.channel) return reject(new Error(`CHANNEL_NOT_CACHED`));

			if(isNaN(timeout) && isNaN(timeout?.timeout)) {
				/*
				this.channel.messages.delete(this.id)
					.then(() => resolve(this))
					.catch(reject);
				*/
				origDelete.call(this)
					.then(resolve)
					.catch(reject);
			} else {
				setTimeout(async() => {
					/*
					this.channel.messages.delete(this.id)
						.then(() => resolve(this))
						.catch(reject);
					*/
					origDelete.call(this)
						.then(resolve)
						.catch(reject);
				}, parseInt(timeout?.timeout ?? timeout));
			}
		});
	};
};
