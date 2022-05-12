const { MessageEmbed, MessageAttachment } = require("discord.js");
const DB = require("../../../Strutcture/models/set-welcome");
const Canvas = require("canvas");
const ee = require("../../../../data/embeds.json");

module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {Message} message
     */
    async execute(member) {    
        DB.findOne({ Guild: member.guild.id }, async (err, data) => {
            if(err) throw err;
            if(data) {
                const canvas = Canvas.createCanvas(700, 250);
                const ctx = canvas.getContext("2d");
                const background = await Canvas.loadImage(data.Background);

                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                ctx.strokeStyle = "#C0C0C0";
                ctx.strokeRect(0, 0, canvas.width, canvas.height);
                ctx.font = "32px Impact";
                ctx.fillStyle = "#F8F8F8";
                ctx.fillText(`Welcome to ${member.guild.name}`, canvas.width / 2.5, canvas.height / 3.5);
                ctx.font = "45px Impact";
                ctx.fillStyle = "#F8F8F8";
                ctx.fillText(`${member.user.tag}!`, canvas.width / 2.5, canvas.height / 1.9);
                ctx.font = "25px Impact";
                ctx.fillStyle = "#F8F8F8";
                ctx.fillText(`You are the                 ${member.guild.memberCount}th member!`, canvas.height / 2.45, canvas.height / 1.44);
                ctx.beginPath();
                ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();
                const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: "jpg" }));
                ctx.drawImage(avatar, 25, 25, 200, 200);
                const attachment = new MessageAttachment(canvas.toBuffer(), "welcome-image.png");
                const welcomeEmbed = new MessageEmbed()
                .setAuthor({ name: `Welcome ${member.guild.name}` })
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                .setDescription(data.Text)
                .setImage("attachment://welcome-image.png");
                const welcomeCh = member.guild.channels.cache.get(data.Channel);

                welcomeCh.send({ embeds: [welcomeEmbed], files: [attachment] });
            }
        })
    }
}