const { MessageEmbed } = require("discord.js");
const { WebhookClient } = require("discord.js");
const client = require("../../index");
const settings = require("../../../data/config.json").webhook;
const ee = require("../../../data/embeds.json");
const e = require("../../../data/emojis.json");

const hook = new WebhookClient({ id: settings.publicId, token: settings.publicToken });

client.on("ready", () => {
    setInterval(() => {
        hook.send({
            embeds: [
                new MessageEmbed()
                    .setDescription(`Client Heartbeat / Uptime \nClient Status: 🟢 Online \n**Uptime:** <t:${parseInt(client.readyTimestamp / 1000)}:R>`)
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            ]
        })
    }, 3600 * 1000)
})