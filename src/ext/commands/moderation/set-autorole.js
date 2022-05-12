const { MessageEmbed, CommandInteraction } = require('discord.js');
const autoroleSchema = require('../../../Strutcture/models/autorole');
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: 'set-autorole',
    description: 'Set your server´s autoroles.',
    userPerms: ["MANAGE_ROLES"],
    clientPerms: ["MANAGE_ROLES"],
    options: [
        {
            name: "role",
            description: "The role that you want to set as the auto role for you're server members",
            required: true,
            type: "ROLE",
        }
    ],
    /** 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const role = interaction.options.getRole("role");

        autoroleSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                data = new autoroleSchema({
                    Guild: interaction.guild.id,
                    Role: role.id
                })
                data.save()
                await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.yes} | The members autorole has been set to **${role.name}**`)
                    ],
                    ephemeral: true
                });
            } else {
                data = new autoroleSchema({
                    Guild: interaction.guild.id,
                    Role: role.id
                })
                data.save()
                await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.yes} | The members autorole has been set to **${role.name}**`)
                    ],
                    ephemeral: true
                })
            }
        })
    }
}