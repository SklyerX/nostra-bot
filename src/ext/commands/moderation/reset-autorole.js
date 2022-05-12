const { CommandInteraction, MessageEmbed } = require('discord.js');
const autoroleSchema = require('../../../Strutcture/models/autorole');
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: 'reset-autorole',
    description: "Reset your server's autoroles.",
    clientPerms: ["MANAGE_ROLES"],
    userPerms: ["MANAGE_ROLES"],
    /** 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {

        autoroleSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                await autoroleSchema.findOneAndDelete({ Guild: interaction.guild.id })
                await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.yes} | Sucessfully removed **${role.name}** as the member auto role.`)
                    ],
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.no} | No auto role has been set for this server.`)
                    ],
                    ephemeral: true
                });
            }
        })
    }
}