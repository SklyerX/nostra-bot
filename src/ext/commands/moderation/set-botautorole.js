const { CommandInteraction, MessageEmbed } = require('discord.js');
const botautoroleSchema = require("../../../Strutcture/models/botautorole");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: 'set-botautorole',
    description: 'Set your server´s botautoroles.',
    clientPerms: ["MANAGE_ROLES"],
    userPerms: ["MANAGE_ROLES"],
    options: [
        {
            name: "role",
            description: "The role that you want to set as the auto role for the server bot(s)",
            required: true,
            type: "ROLE",
        }
    ],
    /** 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {

        const role = interaction.options.getRole("role");

        botautoroleSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                data = new botautoroleSchema({
                    Guild: interaction.guild.id,
                    Role: role.id
                })
                data.save()
                await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.yes} | The bot autorole has been set to **${role.name}**`)
                    ],
                    ephemeral: true
                });
            } else {
                data = new botautoroleSchema({
                    Guild: interaction.guild.id,
                    Role: role.id
                })
                data.save()
                await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.yes} | The bot autorole has been set to **${role.name}**`)
                    ],
                    ephemeral: true
                });
            }
        })
    }
}