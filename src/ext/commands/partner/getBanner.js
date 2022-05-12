const { CommandInteraction, MessageEmbed } = require("discord.js");
const Schema = require("../../../Strutcture/models/partner-banner");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "get-banner",
    description: "Get this servers partnership message",
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if(err) throw err;
            if(data) {
                return interaction.reply({ 
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setDescription(`\`\`\`${data.Message}\`\`\``)
                        .setTitle("Here is " + interaction.guild.name + "'s partner message")
                    ],
                    ephemeral: true
                });
            } else {
                return interaction.reply({ 
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setDescription(`${e.regular.no} | This server does not have a partnership message`)
                    ],
                    ephemeral: true
                });
            }
        })
    }
}