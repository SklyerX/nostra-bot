const { Client, MessageEmbed, CommandInteraction } = require('discord.js');
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: 'guild-manager',
    dev: true,
    description: 'bot can leave server by this command',
    options: [
        {
            name: "id",
            description: "The ID of the guild that you want the bot to leave.",
            required: true,
            type: "STRING"
        }
    ],
    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {

        const guildId = interaction.options.getString("id");

        const guild = client.guilds.cache.find((g) => g.id === guildId)

        if (!guild) return await interaction.reply({
            embeds: [new MessageEmbed()
                .setDescription(e.regular.no + " | Guild not found..")
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            ], ephemeral: true
        })

        await guild.leave()

        await interaction.reply({
            embeds: [new MessageEmbed()
                .setDescription(`Successfully left guild: **${guild.name}**`)
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            ], ephemeral: true
        })
    }
}