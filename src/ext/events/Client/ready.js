const { Client } = require('discord.js');
const config = require("../../../../data/config.json").bot;
const chalk = require('chalk');
const version = require("../../../../package.json").version;

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    async execute(client) {
        // console.log("Logged in as: " + client.user.tag)
        // Set the client user's presence
        setInterval(() => {
            client.user.setPresence({
                activities: [{
                    name: '/help ' + client.guilds.cache.size + " servers",
                    type: "LISTENING"
                }],
                status: 'dnd'
            });
        }, 10000);

        console.log(
            chalk.white.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫") +
            chalk.blue.bold("Client Status") +
            chalk.white.bold("┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        );

        console.log(
            chalk.cyan("[ INFORMATION ]") +
                chalk.white.bold(" | ") +
                chalk.blue(`${new Date().toLocaleDateString()}`) +
                chalk.white.bold(" | ") +
                chalk.cyan("Logged in as") +
                chalk.white.bold(" | ") +
                chalk.white(": ") +
                chalk.blueBright(`${client.user.tag}`)
        );
        console.log(
            chalk.cyan("[ INFORMATION ]") +
                chalk.white.bold(" | ") +
                chalk.blue(`${new Date().toLocaleDateString()}`) +
                chalk.white.bold(" | ") +
                chalk.cyan("Client Verison") +
                chalk.white.bold(" | ") +
                chalk.white(": ") +
                chalk.blueBright(`${version}`)
        );

        if (!config.database) console.log("No database defined");
    }
}