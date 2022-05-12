const { CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
Canvas.registerFont('./data/font/OpenSans-SemiBoldItalic.ttf', { family: 'OpenSans-SemiBoldItalic' })

module.exports = {
    name: "simpcard",
    description: "Get you're validated simpcard",
    options: [
        {
            name: "member",
            description: "get a members simpcard (leave this alone if you want yours)",
            type: "USER"
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const member = interaction.options.getMember("simpcard") || interaction.user;
        const regex = /^((.+?)#\d{4})/;
        // if(member.username.includes(regex)) return console.log("member username includes regex");
        if (!member) return;
        const avatar = await Canvas.loadImage(
            member.displayAvatarURL({ format: "jpg" })
        );
        let background = await Canvas.loadImage(
            "https://cdn.discordapp.com/attachments/881090885440385074/936589045847453776/SimpCard.png"
        )

        const canvas = Canvas.createCanvas(1280, 720);
        const ctx = canvas.getContext(`2d`);

        ctx.drawImage(background, 0, 0, 1280, 720);
        ctx.drawImage(avatar, 100, 75, 320, 360);
        ctx.font = '30px OpenSans-SemiBoldItalic';
        ctx.fillText(`${member.username}`, 230, 505)
        ctx.fillText(`${interaction.createdAt.toLocaleDateString()}`, 75, 620)

        const attachment = new MessageAttachment(
            canvas.toBuffer(),
            "simpcard.jpg"
        );

        interaction.reply({ embeds: [
            new MessageEmbed()
            .setDescription(e.regular.no + " | If your username contains any non-alphabetical charachters, it won't show the username")
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setImage("attachment://simpcard.jpg")
            
        ], files: [attachment] });
    }
}