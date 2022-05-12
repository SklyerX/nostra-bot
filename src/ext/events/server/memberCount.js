const { Client, MessageEmbed } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const ms = require("ms");
const Schema = require("../../../Strutcture/models/memberCount");

module.exports = {
    name: "ready",
    once: false,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        setInterval(() => {
            Schema.find().then((data) => {
                if (!data && !data.length) return;

                data.forEach((value) => {
                    const guild = client.guilds.cache.get(value.Guild);
                    const memberCount = guild.memberCount;
                    const botCount = guild.members.cache.filter(m => m.user.bot).size;

                    if (value.Member != memberCount) {
                        const channel = guild.channels.cache.find(value.Channel);
                        if (channel) {
                            channel.setName(`Members: ${memberCount}`);

                            value.Member = memberCount;
                            value.save();
                        } else {
                            value.delete();
                        }
                    };
                    if (value.Bots != botCount) {
                        const channel = guild.channels.cache.find(value.BotChannel);

                        if (channel) {
                            channel.setName(`Bots: ${botCount}`);

                            value.Bots = botCount;
                            value.save();
                        } else {
                            value.delete();
                        }
                    }
                })
            })
        }, ms("1h"));
    }
};