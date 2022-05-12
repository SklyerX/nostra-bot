const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const Schema = require("../../../Strutcture/models/levelToggle");

module.exports = {
    name: "level-toggle",
    description: "Turn the leveling system on or off.",
    userPerms: ["ADMINISTRATOR"],
    options: [
        {
            name: "value",
            description: "If you want to have the level system enabled to or disabled",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "ON",
                    value: "on"
                },
                {
                    name: "OFF",
                    value: "off",
                },
            ]
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild, options } = interaction;
        const choice = options.getString("value");

        switch (choice) {
            case "on": {
                Schema.findOne({ Guild: guild.id }, async (err, data) => {
                    if (err) throw err;
                    if (!data) {
                        new Schema({
                            Guild: guild.id,
                            Toggle: 1
                        }).save();
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor(ee.color)
                                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                    .setDescription(`${e.regular.yes} | Leveling System is now enabled`)
                            ],
                            ephemeral: true
                        });
                    } else if (data.Toggle == 0) {
                        data.Toggle += 1;
                        data.save();
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor(ee.color)
                                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                    .setDescription(`${e.regular.yes} | Leveling System is now enabled`)
                            ],
                            ephemeral: true
                        });
                    }
                })
                break;
            }
            case "off": {
                Schema.findOne({ Guild: guild.id }, async (err, data) => {
                    if (err) throw err;
                    if (!data) {
                        new Schema({
                            Guild: guild.id,
                            Toggle: 0
                        }).save();
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor(ee.color)
                                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                    .setDescription(`${e.regular.yes} | Leveling System is now disabled`)
                            ],
                            ephemeral: true
                        });
                    } else if (data.Toggle == 1) {
                        data.Toggle -= 1;
                        data.save();
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor(ee.color)
                                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                    .setDescription(`${e.regular.yes} | Leveling System is now disabled`)
                            ],
                            ephemeral: true
                        });
                    }
                })
            }
            break;
        }
    }
}