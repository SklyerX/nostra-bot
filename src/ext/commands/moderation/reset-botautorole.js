const { CommandInteraction, MessageEmbed } = require('discord.js');
const botautoroleSchema = require('../../../Strutcture/models/botautorole');
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: 'reset-botautorole',
    description: "Reset the bot autorole in this server.",
    clientPerms: ["MANAGE_ROLES"],
    userPerms: ["MANAGE_ROLES"],
    /** 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {

        botautoroleSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                await botautoroleSchema.findOneAndDelete({ Guild: interaction.guild.id })
                await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.yes} | Sucessfully removed **${role.name}** as the bot auto role.`)
                    ],
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.no} | No bot auto role has been set for this server.`)
                    ],
                    ephemeral: true
                });
            }
        })
    }
}