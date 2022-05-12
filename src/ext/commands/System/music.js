const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "music",
    description: "Listen to you're fav songs!",
    options: [
        {
            name: "play",
            description: "Play a song.",
            type: "SUB_COMMAND",
            options: [{ name: "query", description: "Provide a name or url of the song", type: "STRING", required: true }]
        },
        {
            name: "volume",
            description: "Alter the volume of the bot",
            type: "SUB_COMMAND",
            options: [{ name: "percent", description: "The percentage of volume (e.i: 80)", type: "NUMBER", required: true }]
        },
        {
            name: "settings",
            description: "Select an option.",
            type: "SUB_COMMAND",
            options: [{
                name: "options", description: "Select an option.", type: "STRING", required: true,
                choices: [
                    { name: "🔢 View Queue", value: "queue" },
                    { name: "⏭ Skip Song", value: "skip" },
                    { name: "⏸ Pause Song", value: "pause" },
                    { name: "▶ Resume Song", value: "resume" },
                    { name: "⏹ Stop Music", value: "stop" },
                    { name: "🔀 Shuffle Queue", value: "shuffle" },
                    { name: "🔃 Toggle Autoplay Modes", value: "AutoPlay" },
                    { name: "📘 Add a Related Song", value: "RelatedSong" },
                    { name: "🔁 Toggle Repeat Mode", value: "RepeatMode" },
                ]
            }]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if (!VoiceChannel) return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                    .setDescription(`${e.regular.no} | You must be in a voice channel to execute this command!`)
            ], ephemeral: true
        });

        if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId) return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                    .setDescription(`${e.regular.no} | I am being played by another user in <#${guild.me.voice.channelId}>`)
            ], ephemeral: true
        });

        try {
            switch (options.getSubcommand()) {
                case "play": {
                    client.distube.playVoiceChannel(VoiceChannel, options.getString("query"), { textChannel: channel, member: member });
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor(ee.color)
                                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                .setDescription(`${e.regular.yes} | Request Accepted`)
                        ]
                    })
                }
                case "volume": {
                    const Volume = options.getNumber("percent");
                    if (Volume > 100 || Volume < 1) return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor(ee.color)
                                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                .setDescription(`${e.regular.no} | The volume needs to be between \`1\` and \`100\``)
                        ], ephemeral: true
                    });
                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor(ee.color)
                                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                .setDescription(`${e.regular.yes} | Successfully set the volume to \`${Volume}%\``)
                        ]
                    });
                }
                case "settings": {
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if (!queue) return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor(ee.color)
                                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                .setDescription(`${e.regular.no} | There are no songs in the queue`)
                        ], ephemeral: true
                    });

                    switch (options.getString("options")) {
                        case "skip":
                            await queue.skip(VoiceChannel);
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor(ee.color)
                                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                        .setDescription(`${e.regular.yes} | Track has been skipped.`)
                                ]
                            });
                        case "stop":
                            queue.stop(VoiceChannel);
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor(ee.color)
                                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                        .setDescription(`${e.regular.yes} | Music has been stopped.`)
                                ]
                            });
                        case "pause":
                            queue.pause(VoiceChannel);
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor(ee.color)
                                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                        .setDescription(`${e.regular.yes} | Track has been paused.`)
                                ]
                            });
                        case "resume":
                            queue.resume(VoiceChannel);
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor(ee.color)
                                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                        .setDescription(`${e.regular.yes} | Track has been resumed.`)
                                ]
                            });
                        case "shuffle":
                            queue.shuffle(VoiceChannel);
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor(ee.color)
                                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                        .setDescription(`🔀 | The queue has been shuffled.`)
                                ]
                            });
                        case "AutoPlay":
                            let Mode = queue.toggleAutoplay(VoiceChannel);
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor(ee.color)
                                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                        .setDescription(`🔃 | Autoplay mode has been set to ${Mode ? "On" : "Off"}.`)
                                ]
                            });
                        case "RelatedSong":
                            queue.addRelatedSong(VoiceChannel);
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor(ee.color)
                                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                        .setDescription(`📘 | Related song has been added to the queue.`)
                                ]
                            });
                        case "RepeatMode":
                            let repMode = client.distube.setRepeatMode(queue);
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor(ee.color)
                                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                        .setDescription(`📘 | Autoplay mode has been set to ${repMode = repMode ? repMode === 2 ? "Queue" : "Song" : "Off"}.`)
                                ]
                            });
                        case "queue":
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor(ee.color)
                                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                        .setDescription(`${queue.songs.map(
                                            (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`
                                        )]
                            });
                    }
                    return;
                }
            }
        } catch (err) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setDescription(`${e.regular.no} | An error occurred while running the command.`)
                        .addField("Error", `${err}`)
                ], ephemeral: true
            });
        }
    }
};
