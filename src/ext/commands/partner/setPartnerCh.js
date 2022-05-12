const { CommandInteraction, MessageEmbed } = require("discord.js");
const Schema = require("../../../Strutcture/models/partner-channel");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "set-partner-channel",
    description: "Set the partnership",
    options: [
        {
            name: "channel",
            description: "The channel you want to set as the partnership",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"]
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { options } = interaction;

        let channel = options.getChannel("channel");

        Schema.findOne({ Guild: interaction.guild.id }, async(err, data) => {
            if(data) data.delete();
            new Schema({
                Guild: interaction.guild.id,
                Channel: channel.id,
            }).save();
            interaction.reply({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`${e.regular.yes} | The partner channel has been set to ${channel}`)], ephemeral: true })
        })
    }
}