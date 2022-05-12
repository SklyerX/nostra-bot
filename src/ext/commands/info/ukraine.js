const { CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const Canvas = require("canvas");

module.exports = {
    name: "ukraine",
    description: "Support the people of ukraine",
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {

        const canvas = Canvas.createCanvas(800, 250);
            const ctx = canvas.getContext("2d");

            const Embed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setAuthor({ name: "Support Ukraine", iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 512 }) });
    
            const background = await Canvas.loadImage(`./src/Strutcture/images/ukraine.png`);
            const avatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ format: "jpg" }));
    
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            // ctx.strokeStyle = "#9B59B6"; //Pink Color
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.font = "38px cursive";
            ctx.textAlign = "center";
            ctx.fillStyle = "#000000";
            ctx.fillText(interaction.user.username + " stands with ukraine", canvas.width / 2, canvas.height / 1.2);
            ctx.beginPath();
            ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            // ctx.drawImage(avatar, 25, 25, 200, 200);
    
            const attachment = new MessageAttachment(canvas.toBuffer(), "ukraine-image.png");

            Embed.setDescription(`<@${interaction.user.id}> Thanks for supporting the people of ukraine! \n\nTo donate to the people of ukraine and support them [click here](https://give.unhcr.ca/page/100190/donate/1?ea.tracking.id=SEM22_EUR&utm_source=google&utm_medium=cpc&utm_campaign=CA_PS_EN_UA&gclid=EAIaIQobChMI1Yqp8c3H9gIVT21vBB2z-QLQEAAYASAAEgK8ovD_BwE&gclsrc=aw.ds)\n\nTo learn more about this issue [click here](https://www.bbc.com/news/world-60525350)`)
            Embed.setImage("attachment://ukraine-image.png");

            interaction.reply({ embeds: [Embed], files: [attachment] }).catch((err) => console.log(err));
    }
}