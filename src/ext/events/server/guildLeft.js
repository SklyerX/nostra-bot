const { Client, MessageEmbed } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const config = require("../../../../data/config.json").channels;

module.exports = {
    name: "guildDelete",
    once: false,
    /**
     * 
     * @param {Client} client 
     */
    execute(guild, client) {
        const Embed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setDescription(`${e.regular.left} **A Has Been Removed**`)
            .setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true} )})

        client.channels.cache.get(config.left).send({ embeds: [Embed] })
    }
};