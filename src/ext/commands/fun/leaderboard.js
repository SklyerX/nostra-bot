const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const level = require("discord-xp");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const levelSchema = require("../../../Strutcture/models/levelToggle");


module.exports = {
    name: "leaderboard",
    description: "Get the level leaderboard for this server",
    /**
     * 
     * @param {CommandInteraction} interaction
     * @param {Client} client 
     */
    async execute(interaction, client) {


        levelSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                new levelSchema({
                    Guild: interaction.guild.id,
                    Toggle: 0
                }).save();
                return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.no} | The leveling system and all of its components have been disabled by the server mod / admin \n\nTo turn on the level system please do \`/level-toggle value: ON\``)
                    ],
                    ephemeral: true
                })
            } else if (data.Toggle == 0) {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.no} | The leveling system and all of its components have been disabled by the server mod / admin \n\nTo turn on the level system please do \`/level-toggle value: ON\``)
                    ],
                    ephemeral: true
                })
            } else if (data.Toggle == 1) {
                const rawLeaderboard = await level.fetchLeaderboard(interaction.guild.id, 10);

                if (rawLeaderboard < 1) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.no} | No one is one the leaderboard right now.`)
                    ],
                    ephemeral: true
                });

                const leaderboard = await level.computeLeaderboard(client, rawLeaderboard, true);

                const lb = leaderboard.map((e) => `\`${e.position}.\` ${e.username}#${e.discriminator} - Level ${e.level}`);

                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${lb.join("\n\n")}`)
                            .setTitle(`${interaction.guild.name}'s xp leaderboard`)
                    ],
                    ephemeral: true
                });
            }
        });
    }
};