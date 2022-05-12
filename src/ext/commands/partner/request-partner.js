const { CommandInteraction, MessageEmbed, Client, MessageActionRow, MessageButton } = require("discord.js");
const Schema = require("../../../Strutcture/models/partner-channel");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "request-partner",
    description: "Request to become partners of this server",
    options: [
        {
            name: "name",
            description: "The name of you're corporation",
            required: true,
            type: "STRING"
        },
        {
            name: "banner",
            description: "You're banner proposal (advertisement - message)",
            required: true,
            type: "STRING"
        },
        {
            name: "link",
            description: "The link of you're website, discord server, discord bot, etc",
            required: true,
            type: "STRING"
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const corpName = interaction.options.getString("name");
        const corpBanner = interaction.options.getString("banner");
        const corpLink = interaction.options.getString("link");

        const gid = interaction.guild.id;
        const uid = interaction.user;

        if (!corpLink.includes("https://" || "http://")) return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`${e.regular.no} | Please add a valid url, you're url must contain \`https://\` or \`http://\``)
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            ],
        })

        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`${e.regular.yes} | You're partner application has successfully been submitted, please await verification`)
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            ]
        })

        interaction.guild.fetchOwner().then(async (u) => {
            try {
                const newsong = new MessageEmbed()
                    .setTitle("Partnership Request: " + corpName)
                    .setDescription(`A new partnership request has been submitted by ${corpName}. Press \`❓\` to view their proposal. Press \`✅\` To accept their request. \`❌\` To deny their request`)
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                    .addField("Note", "If you do not have the partnership channel setup using the bot please do so or else you will have to manualy copy and paste their proposal \nTo run the command do \`/set-partner-channel\`")

                var playingMessage = await u.send({ embeds: [newsong] });

                await playingMessage.react("✅");
                await playingMessage.react("❌");
                await playingMessage.react("❓");
            } catch (error) {
                console.error(error);
            }

            const filter = (reaction, user) => user.id !== message.client.user.id;
            var collector = playingMessage.createReactionCollector(filter);

            collector.on("collect", async (reaction, user) => {

                switch (reaction.emoji.name) {

                    //np
                    case "✅":
                        reaction.message.delete();
                        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
                            if (err) throw err;
                            if (!data) {
                                interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                            .setDescription(`${e.regular.no} | You do not have a partners channel setup. please use the bot to set the channel up or copy and paste this request manualy`)
                                            .setColor(ee.color)
                                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                    ]
                                })
                            } else {
                                const Embed = new MessageEmbed()
                                    .setColor(ee.color)
                                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                    .setDescription(corpBanner)
                                    .setAuthor({ name: `New Partnership: ${corpName}`, iconURL: uid.displayAvatarURL({ dynamic: true }) });

                                const invite = new MessageActionRow()
                                    .addComponents(
                                        new MessageButton()
                                            .setLabel(`Support`)
                                            .setStyle("SECONDARY")
                                            .setCustomId("supporter-id")
                                            .setEmoji("🔗")
                                    );

                                const channelToSend = client.guilds.cache.get(gid).channels.cache.get(data.Channel)
                                channelToSend.send({ embeds: [Embed], components: [invite] });
                                uid.send({
                                    embeds: [
                                        new MessageEmbed()
                                            .setDescription(`${e.regular.yes} | You're partnership request has been accepted, congrats`)
                                            .setColor(ee.color)
                                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                    ]
                                });

                                const filter1 = i => i.customId === 'supporter-id' && i.user.id === interaction.user.id;

                                const collector1 = channelToSend.createMessageComponentCollector({ filter1 });

                                collector1.on('collect', async i => {
                                    if (i.customId === 'supporter-id') {
                                        await i.reply({
                                            embeds: [new MessageEmbed()
                                                .setDescription(`[Click here](${corpLink}) to view their link (website, discord, etc) *\`[${corpLink}]\`*`)
                                                .setColor(ee.color)
                                                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

                                            ], ephemeral: true
                                        });
                                    }
                                });
                            }
                        });
                        break;

                    case "❌":
                        reaction.message.delete();
                        break;
                    case "❓":
                        reaction.message.channel.send({
                            embeds: [
                                new MessageEmbed()
                                    .setDescription(`There banner is shown below \n\`\`\`${corpBanner}\`\`\``)
                                    .setColor(ee.color)
                                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            ]
                        })
                        break;
                }
            });
        });
    }
}