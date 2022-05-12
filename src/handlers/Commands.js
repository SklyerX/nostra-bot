const client = require("../index");
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const chalk = require("chalk");
const config = require("../../data/config.json").bot;

/**
 * @param {client} client 
 * @returns 
 */
module.exports = async (client) => {
	console.log(
		chalk.white.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫") +
		chalk.blue.bold("Slash Commands") +
		chalk.white.bold("┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	);

	const slashCommands = await globPromise(
		`${process.cwd()}/src/ext/commands/**/*.js`
	);

	const arrayOfSlashCommands = [];
	slashCommands.map((value) => {
		const file = require(value);
		if (file.name) {
			console.log(
				chalk.cyan("[ INFORMATION ]") +
				chalk.white.bold(" | ") +
				chalk.blue(`${new Date().toLocaleDateString()}`) +
				chalk.white.bold(" | ") +
				chalk.cyan("Slash Command Load Status") +
				chalk.white.bold(" | ") +
				chalk.blue(file.name) +
				chalk.white(": ") +
				chalk.greenBright(`Success`)
			);
		} else if (!file?.name) {
			console.log(
				chalk.cyan("[ INFORMATION ]") +
				chalk.white.bold(" | ") +
				chalk.blue(`${new Date().toLocaleDateString()}`) +
				chalk.white.bold(" | ") +
				chalk.cyan("Slash Command Load Status") +
				chalk.white.bold(" | ") +
				chalk.blue(file.name || "MISSING") +
				chalk.white(": ") +
				chalk.redBright(`Failed`)
			);
		}
		client.commands.set(file.name, file);

		if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
		arrayOfSlashCommands.push(file);
	});

	client.on("ready", async () => {
		if(config.slash === "dev") {
			await client.guilds.cache
				.get(config.guildId)
				.commands.set(arrayOfSlashCommands).then(() => {
					console.log(
						chalk.cyan("[ INFORMATION ]") +
						chalk.white(" | ") +
						chalk.blue(`${new Date().toLocaleDateString()}`) +
						chalk.white(" | ") +
						chalk.cyan("Slash Commands") +
						chalk.white(": ") +
						chalk.white(`Loaded to`) +
						chalk.white(": ") +
						chalk.greenBright(`${client.guilds.cache.get(config.guildId).name}`)
					)
				});
		} else if(config.slash === "prod") {
			await client.application.commands.set(arrayOfSlashCommands).then(() => {
				console.log(
					chalk.cyan("[ INFORMATION ]") +
						chalk.white.bold(" | ") +
						chalk.blue(`${new Date().toLocaleDateString()}`) +
						chalk.white.bold(" | ") +
						chalk.cyan("Slash Commands") +
						chalk.white(": ") +
						chalk.greenBright(`Loaded as Multi Guild`)
				);
			});
		} else {
			console.log("No value was given to the slash command handler for publishing!")
		}
	});
};