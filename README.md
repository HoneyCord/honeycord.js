<div align="center">
	<p>
		<a href="https://honeycord.rivest.tk">
			<img src="https://honeycord.rivest.tk/img/logo.png" height="400" alt="HoneyCord.js" />
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
const { Client } = require('discord.js');
require('honeycord.js')(); // Load and run honeycord.js

const client = new Client();
```
## Links

- [***Dis***cord.js Website](https://discord.js.org/) ([source](https://github.com/discordjs/website))
- [GitHub](https://github.com/HoneyCord/honeycord.js)
- [npm](https://www.npmjs.com/package/honeycord.js)

## Contributing

Before creating an issue, please ensure that it hasn't already been reported/suggested.

## Help

If you don't understand something in the documentation, you are experiencing problems, or you just need a gentle
nudge in the right direction, please don't hesitate to join our [honeycord.js Server](https://honeycord.rivest.tk/discord).
