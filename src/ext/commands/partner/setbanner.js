const { CommandInteraction, MessageEmbed } = require("discord.js");
const Schema = require("../../../Strutcture/models/partner-banner");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "set-banner",
    description: "Set the partnership banner (message).",
    options: [
        {
            name: "message",
            description: "The message that you want to set as the partnership banner",
            required: true,
            type: "STRING"
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const msg = interaction.options.getString("message");

        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if(err) throw err;
            if(data) {
                data.delete();
                new Schema({
                    Guild: interaction.guild.id,
                    Message: msg
                }).save();

                return interaction.reply({ 
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setDescription(`${e.regular.yes} | Successfully updated the server message banner as: \n\`\`\`${msg}\`\`\``)
                    ],
                    ephemeral: true
                });
            } else {
                new Schema({
                    Guild: interaction.guild.id,
                    Message: msg
                }).save();
                return interaction.reply({ 
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setDescription(`${e.regular.yes} | Successfully set the server message banner as: \n\`\`\`${msg}\`\`\``)
                    ],
                    ephemeral: true
                });
            }
        })
    }
}