<div align="center">
	<p>
		<a href="https://honeycord.rivest.tk">
			<img src="https://honeycord.rivest.tk/img/logo.png" height="400" alt="HoneyCord.js' logo. Credits to rusianⁿᵛ#6993 ." />
		</a>
	</p>
	<br />
	<p>
		<a href="https://honeycord.rivest.tk/discord" alt="HoneyCord.js Discord support server">
			<img src="https://img.shields.io/discord/767675922119393301?color=3181b0&logo=discord&logoColor=white"></img>
		</a>
		<a href="https://www.npmjs.com/package/honeycord.js">
			<img src="https://img.shields.io/npm/v/honeycord.js.svg?maxAge=3600" alt="npm version"></img>
		</a>
		<a href="https://www.npmjs.com/package/honeycord.js">
			<img src="https://img.shields.io/npm/dt/honeycord.js.svg?maxAge=3600" alt="npm downloads"></img>
		</a>
	</p>
</div>

## About
honeycord.js is an extension for [discord.js](https://www.npmjs.com/package/discord.js) (>v13) that makes developing bots a little bit easier.

## Installation
**To install (and use) honeycord.js, both Node.js >=16.9.0 and Discord.js >=13 are required.**

```sh-session
npm install honeycord.js
```

### Optional packages
- [@discordjs/voice](https://www.npmjs.com/package/@discordjs/voice) to use `<VoiceChannel>.join` and `<VoiceChannel>.leave` methods (`npm install @discordjs/voice`).

## Example usage

Install all required dependencies:
```sh-session
npm install discord.js honeycord.js
```

Initialise a Client without specifying Intents:
```js
require('honeycord.js')(); // Load and run HoneyCord.js first
const { Client } = require('discord.js');

const client = new Client();
```

Send an embed through a Text Channel without specifying the Array of embeds:
```js
const embed = new MessageEmbed()
	.setColor('RANDOM')
	.setAuthor(message.author.username, message.author.displayAvatarURL());

message.channel.send(embed);
```

Reply a message with an embed:
```js
const embed = new MessageEmbed()
	.setColor('RANDOM')
	.setAuthor(message.author.username, message.author.displayAvatarURL());

message.reply(embed);
```

Delete a message with certain timeout:
```js
message.delete(5_000)
	.then(() => {
		console.log('Message deleted!');
	})
```

Split a message with code and embed:
```js
const embed = new MessageEmbed()
	.setColor('RANDOM')
	.setFooter('Enjoy this.');

message.reply('This should be cut off at 40 characters.\nNo?', embed, {
	code: 'txt',
	split: {
		maxLength: 40,
	},
});
```

Replying to a command interaction:
```js
const embed = new MessageEmbed()
	.setColor('RANDOM')
	.setAuthor(message.author.username, message.author.displayAvatarURL());

interaction.reply(embed);
```

Connecting to a voice channel:
```js
channel.join()
	.then(() => {
		console.log("Hey! I'm connected right now.");
	});
```

Get the user's banner (even if the user does not have one):
```js
user.displayBannerURL()
```

## Frequently Asked Questions

#### What does this package do?
This package makes it easier to develop bots on top of Discord.js by changing things like `<TextChannel>.send` so that they can accept embeds, buttons and other objects in a "brute" way.

#### Can it break Discord.js?
It should not break Discord.js, and you can continue to use it as before.
If you see something broken, remember you can report it and we'll fix it as soon as possible!

#### I have a question/Where can I get support?
If you have any questions or problems, you can go to [our official Discord server](https://honeycord.rivest.tk/discord) ^w^

#### Do you plan to compete against Discord.js?
HoneyCord.js does not plan to compete in any way against Discord.js, and in fact, it is merely an extension/"patch" for Discord.js. Discord.js and its team, we love you **<3**

#### I have HoneyCord.js and it still won't let me send Embeds directly!
Make sure HoneyCord.js is required **and executed** before any `require("discord.js")`, also make sure you have it installed!

#### I don't like this module because for X reason Discord.js must have removed X thing and blah blah blah...
**I don't mind :)**
If you don't like this module and/or don't want to use it, just don't use it (also don't come and tell us about your opinion on our Discord server, it's not for that).

#### Motivations?
I found it too annoying to have to specify several properties just to send a couple of embeds and buttons, so I said to myself, "what if I make a module that makes the work a bit easier?"
And that's how HoneyCord.js was born :D

#### Do you plan on adding support for X thing?
Maybe yes, maybe no, maybe I hadn't even thought about it.
Remember you can join our [official server](https://honeycord.rivest.tk/discord) to find out about these things! ^w^

## Links

- [***Dis***cord.js Website](https://discord.js.org/) ([source](https://github.com/discordjs/website))
- [GitHub](https://github.com/HoneyCord/honeycord.js)
- [npm](https://www.npmjs.com/package/honeycord.js)

## Contributing

Before creating an issue, please ensure that it hasn't already been reported/suggested.

## Help / Report-a-bug

If you don't understand something in the documentation, you are experiencing problems, or you just need a gentle
nudge in the right direction, please don't hesitate to join our [honeycord.js Server](https://honeycord.rivest.tk/discord).
