const { CommandInteraction, MessageEmbed } = require("discord.js");
const Schema = require("../../../Strutcture/models/set-welcome");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "set-welcome",
    description: "Set the channel to properly welcome you're members",
    userPerms: ["ADMINISTRATOR"],
    options: [
        {
            name: "channel",
            description: "The channel of the action logs",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"]
        },
        {
            name: "background-image",
            description: "The URL of the image you want to put as the member welcome card background image",
            required: true,
            type: "STRING",
        },
        {
            name: "text",
            description: "The welcome message that you want to add on the embed",
            required: true,
            type: "STRING",
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    execute(interaction) {
        const { options } = interaction;

        let channel = options.getChannel("channel");
        const Text = options.getString("text");
        const backgroundUrl = options.getString("background-image");

        if(!backgroundUrl.startsWith === "https://" || !backgroundUrl.startsWith === "http://" && !backgroundUrl.endsWith(".gif")) return interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                .setDescription(`${e.regular.no} | An invalid link was provided, please make sure the link includes \`https://\` or \`http://\` or the image provided is not png format \`gifs are not accepted\``)
            ],
            ephemeral: true
        });

        Schema.findOne({ Guild: interaction.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) data.delete();
            new Schema({
                Guild: interaction.guild.id,
                Channel: channel.id,
                Background: backgroundUrl,
                Text,
            }).save();
            interaction.reply({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`${e.regular.yes} The welcome channel has been set to ${channel}`)], ephemeral: true })
        });
    }
}