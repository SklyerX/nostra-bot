const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const ms = require("ms");

module.exports = {
    name: "giveaway",
    description: "start a giveaway!",
    type: 'CHAT_INPUT',
    userPerms: ["ADMINISTRATOR"],
    options: [
        {
            name: "start",
            description: "start the giveaway",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "duration",
                    description: "Provide a duration for this giveaway (1m, 1h, 1d)",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "winners",
                    description: "Select the amount of winners for this giveaway",
                    type: "INTEGER",
                    required: true,
                },
                {
                    name: "prize",
                    description: "Provide the prize for the winner(s)",
                    type: "STRING",
                    required: true
                },
                {
                    name: "channel",
                    description: "Select a channel to start the giveaway in.",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"],
                    required: true,
                }
            ]
        },
        {
            name: "actions",
            description: "Options for the giveaway",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "options",
                    description: "Select an option.",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "end",
                            value: "end",
                        },
                        {
                            name: "pause",
                            value: "pause",
                        },
                        {
                            name: "resume",
                            value: "resume",
                        },
                        {
                            name: "reroll",
                            value: "reroll",
                        },
                        {
                            name: "delete",
                            value: "delete",
                        },
                    ]
                },
                {
                    name: "message-id",
                    description: "Provide the message id of the giveaway",
                    type: "STRING",
                    required: true
                }
            ]
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const { options } = interaction;

        const Sub = interaction.options.getSubcommand();

        const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

        const successEmbed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

        switch (Sub) {
            case "start": {
                const giveawayChannel = interaction.options.getChannel("channel");
                const duration = interaction.options.getString("duration");
                const winnerCount = interaction.options.getInteger("winners");
                const prize = interaction.options.getString("prize");

                client.giveawaysManager.start(giveawayChannel, {
                    duration: ms(duration),
                    winnerCount,
                    prize,
                    messages: {
                        giveaway: "🎉 **Giveaway Started** 🎉",
                        giveawayEnded: "⭐ **Giveaway Ended** ⭐",
                        winMessage: `Congrats {winners}! you won **{this.prize}**`
                    }
                }).then(async () => {
                    successEmbed.setDescription(e.regular.yes + " Giveaway successfully started!")
                    return interaction.reply({ embeds: [successEmbed], ephemeral: true })
                }).catch((err) => {
                    errorEmbed.setDescription(e.regular.no + " There has been an error starting the giveaway\nError:\`\`\`" + err + "\`\`\`")
                    return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                })
            }
                break;

            case "actions": {
                const choice = options.getString("options");
                const messageId = options.getString("message-id");
                const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);

                if (!giveaway) {
                    errorEmbed.setDescription(`${e.regular.no} Unable to find the giveaway with the message id: ${messageId} in this server.`);
                    return interaction.reply({ embeds: [errorEmbed,] })
                }

                switch (choice) {
                    case "end": {
                        client.giveawaysManager.end(messageId).then(() => {
                            successEmbed.setDescription(e.regular.yes + " Giveaway successfully ended.");
                            return interaction.reply({ embeds: [successEmbed], ephemeral: true });
                        }).catch((err) => {
                            errorEmbed.setDescription(e.regular.no + " There has been an error starting the giveaway\nError:\`\`\`" + err + "\`\`\`")
                            return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                        });
                    }
                        break;
                    case "pause": {
                        client.giveawaysManager.pause(messageId).then(() => {
                            successEmbed.setDescription(e.regular.yes + " Giveaway successfully paused.");
                            return interaction.reply({ embeds: [successEmbed], ephemeral: true });
                        }).catch((err) => {
                            errorEmbed.setDescription(e.regular.no + "There has been an error starting the giveaway\nError:\`\`\`" + err + "\`\`\`")
                            return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                        });
                    }
                        break;
                    case "resume": {
                        client.giveawaysManager.unpause(messageId).then(() => {
                            successEmbed.setDescription(e.regular.yes + " Giveaway successfully resumed.");
                            return interaction.reply({ embeds: [successEmbed], ephemeral: true });
                        }).catch((err) => {
                            errorEmbed.setDescription(e.regular.no + "There has been an error starting the giveaway\nError:\`\`\`" + err + "\`\`\`")
                            return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                        });
                    }
                        break;
                    case "reroll": {
                        client.giveawaysManager.reroll(messageId).then(() => {
                            successEmbed.setDescription(e.regular.yes + " Giveaway successfully rolled.");
                            return interaction.reply({ embeds: [successEmbed], ephemeral: true });
                        }).catch((err) => {
                            errorEmbed.setDescription(e.regular.no + "There has been an error starting the giveaway\nError:\`\`\`" + err + "\`\`\`")
                            return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                        });
                    }
                        break;
                    case "delete": {
                        client.giveawaysManager.delete(messageId).then(() => {
                            successEmbed.setDescription(e.regular.yes + " Giveaway successfully deleted.");
                            return interaction.reply({ embeds: [successEmbed], ephemeral: true });
                        }).catch((err) => {
                            errorEmbed.setDescription(e.regular.no + "There has been an error starting the giveaway\nError:\`\`\`" + err + "\`\`\`")
                            return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                        });
                    }
                        break;
                }
            }
                break;

            default: {
                console.log("Error in giveaway command")
            }
        }
    },
};