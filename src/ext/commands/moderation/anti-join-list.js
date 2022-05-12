const { CommandInteraction, MessageEmbed } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const { antijoin } = require("../../Collections/index");

module.exports = {
    name: "anti-join-list",
    description: "Get the list of users that were kicked during the anti-join event",
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        var collection = antijoin.get(interaction.guild.id);

        if(!collection) return interaction.reply({ embdes: [
            new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setDescription(`${e.regular.no} | The anti join is disabled`)
        ]})
        else
        await interaction.reply({ embeds: [
            new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setDescription(`Kicked Members: ${collection.map((value) => {
                return `${value.tag} (${value.id})`
            })}`)
        ], 
        ephemeral: true })
    }
}