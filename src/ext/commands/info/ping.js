const { CommandInteraction, MessageEmbed } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "ping",
    description: "Get the bot's latency",
    timeout: 5000,
    /**
     * @param {CommandInteraction} interaction
     */
    execute(interaction, client) {
        const Embed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setDescription(`${e.regular.ping} **Latency:** ${client.ws.ping}`)

        interaction.reply({ embeds: [Embed] })
    }
}