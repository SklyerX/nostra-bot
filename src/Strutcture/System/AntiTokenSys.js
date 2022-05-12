const { WebhookClient, MessageEmbed } = require("discord.js");
const ee = require("../../../data/embeds.json");
const e = require("../../../data/emojis.json");
const s = require("../../../data/config.json").bot;
const hookSettings = require("../../../data/config.json").webhook;

const hook = new WebhookClient({ id: hookSettings.alertId, token: hookSettings.alertToken });

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        if (message.content === s.token) {

            // await client.mail.sendMail({
            //     from: "johndose.me@gmail.com", //sender
            //     to: "johndose.me@gmail.com",
            //     subject: "Bot token compromized",
            //     text: `You're bot token found in ${message.guild.name} \n\nBot: ${client.user.tag} \nServer: ${message.guild.name} (${message.guild.id}) \nUser: ${message.author.tag} (${message.author.id})`,
            //     //reciever
            // })

            hook.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setDescription(`The bot (${client.user.tag})'s token has been obtained, please re-create a new one.`)
                ],
                content: `<@805166992432431124>`
            })
            try {
                message.delete();
            } catch (err) {
                throw err;
            }
        }
    })
}