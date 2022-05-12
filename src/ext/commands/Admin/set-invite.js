const { CommandInteraction, MessageEmbed } = require("discord.js");
const Schema = require("../../../Strutcture/models/set-invite");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "set-invite",
    description: "Set a channel to log invites.",
    userPerms: ["ADMINISTRATOR"],
    options: [
        {
            name: "channel",
            description: "The channel of the invite logs",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"]
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    execute(interaction) {
        const { options } = interaction;

        let channel = options.getChannel("channel");

        Schema.findOne({ Guild: interaction.guild.id }, async(err, data) => {
            if(data) data.delete();
            new Schema({
                Guild: interaction.guild.id,
                Channel: channel.id,
            }).save();
            interaction.reply({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`${e.regular.yes} | The invite logs channel is set to ${channel}`)], ephemeral: true })
        })
    }
}