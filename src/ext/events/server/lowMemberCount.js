const { Client, MessageEmbed } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const config = require("../../../../data/config.json").channels;

module.exports = {
    name: "guildCreate",
    once: false,
    /**
     * 
     * @param {Client} client
     */
    async execute(guild, client) {
        if (guild.memberCount < 35) {
            // try {
            //     const fetchedLogs = await guild.fetchAuditLogs({
            //         limit: 1,
            //         type: 'BOT_ADD',
            //     });
            //     let member = guild.members.cache.get(fetchedLogs.entries.first().executor.id)

            //     let Embed = new MessageEmbed()
            //         .setColor(ee.color)
            //         .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            //         .setDescription(`${e.regular.left} I have left you're server due to you're member count. If you want, you can re-invite me once you have 35 or more members \n\nCurrent amount of members: **${guild.memberCount}**`)
            //     member.send({ embeds: [Embed] })
            // } catch (err) { 
            //     console.log("Missing Permission to fetch the audit log. Leaving the server without notification or because the users dms are blocked")
            // }
            // guild.leave();
            console.log("Low member count")
        }
    }
};