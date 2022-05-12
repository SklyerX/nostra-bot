const { CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const Schema = require("../../../Strutcture/models/set-boost");
const Canvas = require("canvas");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "test-boost",
    description: "Test how the boost detection would work!",
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {

        const data = await Schema.findOne({ Guild: interaction.guild.id });

        const channel = interaction.guild.channels.cache.get(data.Channel);

        const { guild } = interaction;

        const Embed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setAuthor({ name: "Server Boosted", iconURL: guild.iconURL({ dynamic: true, size: 512 }) });

        const canvas = Canvas.createCanvas(800, 250);
        const ctx = canvas.getContext("2d");

        const background = await Canvas.loadImage(`./src/Strutcture/images/boost.png`);
        const avatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ format: "jpg" }));

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        // ctx.strokeStyle = "#9B59B6"; //Pink Color
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.font = "38px cursive";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(interaction.user.tag, canvas.width / 2, canvas.height / 1.2);
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new MessageAttachment(canvas.toBuffer(), "boost-image.png");

        Embed.setDescription(`<@${interaction.user.id}> Thanks for boosting the server!`)
        Embed.setImage("attachment://boost-image.png");

        if (data) {
            channel.send({ content: "Here is a sample of the real boost detection event", embeds: [Embed], files: [attachment] }).catch((err) => console.log(err));
            interaction.reply({ embeds: [Embed.setDescription(`${e.regular.yes} Successfully sent the test message in <#${channel.id}>`)], ephemeral: true })
        } else {
            interaction.reply({ content: "Here is a sample of the real boost detection event", embeds: [Embed], files: [attachment] })
        }
    }
}