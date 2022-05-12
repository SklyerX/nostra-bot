const { GuildMember, MessageEmbed, MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
const Schema = require("../../../Strutcture/models/set-boost");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "guildMemberUpdate",
    /**
     * @param {GuildMember} newMember
     * @param {GuildMember} oldMember
     */
    async execute(oldMember, newMember, client) {

        const data = await Schema.findOne({ Guild: newMember.guild.id });
        if(!data) return;
        
        const channel = newMember.guild.channels.cache.get(data.Channel);

        const { guild } = newMember;

        const Embed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setAuthor({ name: "Server Boosted", iconURL: guild.iconURL({ dynamic: true, size: 512 }) });

        if(!oldMember.premiumSince && newMember.premiumSince) {
            const canvas = Canvas.createCanvas(800, 250);
            const ctx = canvas.getContext("2d");
    
            const background = await Canvas.loadImage(`./src/Strutcture/images/boost.png`);
            const avatar = await Canvas.loadImage(newMember.user.displayAvatarURL({ format: "jpg" }));
    
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "#9B59B6"; //Pink Color
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.font = "38px cursive";
            ctx.textAlign = "center";
            ctx.fillStyle = "#ffffff";
            ctx.fillText(newMember.displayName, canvas.width / 2, canvas.height / 1.2);
            ctx.beginPath();
            ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, 25, 25, 200, 200);
    
            const attachment = new MessageAttachment(canvas.toBuffer(), "boost-image.png");

            Embed.setDescription(`<@${newMember.user.id}> Thanks for boosting the server!`)
            Embed.setImage("attachment://boost-image.png");

            channel.send({ embeds: [Embed], files: [attachment] }).catch((err) => console.log(err));
        }
    }
}