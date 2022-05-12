const { MessageEmbed, Message, Client } = require("discord.js");
const DB = require("../../../Strutcture/models/AfkSystem");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "messageCreate",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, client
    ) {
        if(message.author.bot) return;
        if(message.channel.type === "DM") return;

        // await DB.deleteOne({ Guild: message.guild.id, UserID: message.author.id });

        try {
            if(message.mentions.members.size && !message.mentions.has(client.user, { ignoreEveryone: true })) {
                const Embed = new MessageEmbed()
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon });
    
                message.mentions.members.forEach((m) => {
                    DB.findOne({ GuildID: message.guild.id, UserID: m.id }, async(err, data) => {
                        if(err) throw err;
                        if(data)
                            Embed.setDescription(`${m} went AFK <t:${data.Time}:R>\n **Status:** \`${data.Status}\``);
                        return message.reply({ embeds: [Embed] });
                    })
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
}