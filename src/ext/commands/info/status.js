const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const { connection } = require("mongoose");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
require("../../../handlers/Commands");


module.exports = {
    name: "status",
    description: "Get some information about the bot's server connection and ping",
    /**
     *@param {CommandInteraction} interaction
     *@param {Client} client
     */
    async execute(interaction, client) {

        const status = [
            `${e.regular.no} Disconnected`,
            `${e.regular.yes} Connected`,
            `${e.regular.loading} Connecting`,
            `${e.regular.refresh} Disconnecting`
        ];

        const Response = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setDescription(`**Client Connection:** ${e.regular.yes} Active - \`${client.ws.ping}ms\` \n**Uptime:** <t:${parseInt(client.readyTimestamp / 1000)}:R> \n
            **Database Connection:** ${status[connection.readyState]}`);

            interaction.reply({ embeds: [Response] });
    }
}
