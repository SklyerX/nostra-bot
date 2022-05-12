const { MessageEmbed, Message, Client, MessageActionRow, MessageButton } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const c = require("../../../../data/config.json").bot;
const levelSchema = require("../../../Strutcture/models/levelToggle");

const config = require("../../../../data/config.json");

const lvl = require("discord-xp");
lvl.setURL(c.database)

module.exports = {
    name: "messageCreate",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, client) {
        if (message.author.bot) return;
        if (message.channel.type === "DM") return;

        const invite = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL(`${config.external.inv}`)
                    .setLabel(`Invite Nostra Bot`)
                    .setStyle('LINK')
            )
            .addComponents(
                new MessageButton()
                    .setURL(config.external.discord)
                    .setLabel(`Join Support Server`)
                    .setStyle('LINK')
            )
            .addComponents(
                new MessageButton()
                    .setURL(config.external.website)
                    .setLabel(`Visit My Site`)
                    .setStyle('LINK')
            )
        // .addComponents(
        //     new MessageButton()
        //         .setURL(`${v.vote}`)
        //         .setLabel(`Vote OnlyNude Bot`)
        //         .setStyle('LINK')
        // )

        if (message.mentions.has(client.user, { ignoreEveryone: true })) {
            message.channel.send({
                embeds:
                    [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`\nI am a Discord All-In-One Bot!\n\nMy Commands are registered as: \`/\`\n\nMore About Me Below!`)
                    ],
                components: [invite]
            });
        }

        levelSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                new levelSchema({
                    Guild: message.guild.id,
                    Toggle: 0
                }).save();
                return;
            }

            if (data.Toggle == 1) {
                const randomXp = Math.floor(Math.random() * 29) + 1;
                const hasLeveledUp = await lvl.appendXp(message.author.id, message.guild.id, randomXp);
                if (hasLeveledUp) {
                    const user = await lvl.fetch(message.author.id, message.guild.id);

                    const Embed = new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setDescription(`:tada: | ${message.author}, congratulations! You have leveled up to **${user.level}**.`)

                    message.channel.send({ embeds: [Embed] });
                }
            } else if (data.Toggle === 0) {
                return;
            }

        });

    }
}