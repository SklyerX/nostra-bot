const { CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const Schema = require("../../../Strutcture/models/set-invite");
const Canvas = require("canvas");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "test-invite",
    description: "Test how the invite logs is going to work like!",
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {

        const data = await Schema.findOne({ Guild: interaction.guild.id });

        const channel = interaction.guild.channels.cache.get(data.Channel);

        if (data) {
            channel.send(`Welcome ${interaction.user.tag}! You were invited by [Inviter] and He has [invite users] Invites`).catch((err) => console.log(err));
            channel.send(`Welcome ${interaction.user.tag}! I can't figure out how you joined because I don't have the "MANAGE_GUILD" permission!`).catch((err) => console.log(err));
            channel.send(`Welcome ${interaction.user.tag}! I can't figure out how you joined the server...`).catch((err) => console.log(err));
            channel.send(`Welcome ${interaction.user.tag}! You joined using a custom invite Vanity URL !`).catch((err) => console.log(err));
            interaction.reply({ embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                .setDescription(`${e.regular.yes} Successfully sent the test message in <#${channel.id}>`)], ephemeral: true })
        } else {
            interaction.reply("Examples shown below are what the real invite tracker would look like: ")
            channel.send(`Welcome ${interaction.user.tag}! You were invited by [Inviter] and He has [invite users] Invites`).catch((err) => console.log(err));
            channel.send(`Welcome ${interaction.user.tag}! I can't figure out how you joined because I don't have the "MANAGE_GUILD" permission!`).catch((err) => console.log(err));
            channel.send(`Welcome ${interaction.user.tag}! I can't figure out how you joined the server...`).catch((err) => console.log(err));
            channel.send(`Welcome ${interaction.user.tag}! You joined using a custom invite Vanity URL !`).catch((err) => console.log(err));
        }
    }
}