const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const Schema = require("../../../Strutcture/models/slashCommand");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "slash-command",
    description: "disable and enable the bot's slash commands in you're server",
    userPerms: ["ADMINISTRATOR"],
    options: [
        {
            name: "command",
            description: "The name of the command that you want to disable",
            required: true,
            type: "STRING",
        },
        {
            name: "value",
            description: "Do you want you're slash commands on or off",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "ON",
                    value: "60s"
                },
                {
                    name: "OFF",
                    value: "5min",
                },
            ]
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { guild, member, options } = interaction;

        const choice = options.getString("value");
        const commandName = options.getString("command");

        switch (choice) {
            case "60s": {
                const cmd = commandName;
                if(!!client.commands.get(cmd) === false) return interaction.reply({
                    embeds:[
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setDescription(`${e.regular.no} | The command stated does not exist`)
                    ],
                    ephemeral: true
                });

                Schema.findOne({ Guild: guild.id }, async (err, data) => {
                    if(err) throw err;
                    if(data) {
                        if(data.Cmds.includes(cmd)) return interaction.reply({
                            embeds:[
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                .setDescription(`${e.regular.no} | The command stated has already been disabled`)
                            ],
                            ephemeral: true
                        });

                        data.Cmds.push(cmd)
                    } else {
                        data = new Schema({
                            Guild: guild.id,
                            Cmds: cmd
                        })
                    }
                    await data.save();
                    interaction.reply({
                        embeds:[
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.yes} | Successfully disabled \`${cmd}\``)
                        ],
                        ephemeral: true
                    });
                })
            }
                break;
            case "5min": {
                const cmd = commandName;
                if(!!client.commands.get(cmd) === false) return interaction.reply({
                    embeds:[
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setDescription(`${e.regular.no} | The command stated does not exist`)
                    ],
                    ephemeral: true
                });

                Schema.findOne({ Guild: guild.id }, async (err, data) => {
                    if(err) throw err;
                    if(data) {
                        if(data.Cmds.includes(cmd)) {
                            let commandNumber;

                            for(let i = 0; i < data.Cmds.length; i++) {
                                if(data.Cmds[i] === cmd) data.Cmds.splice(i, 1)
                            }

                            await data.save();
                            interaction.reply({
                                embeds:[
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                    .setDescription(`${e.regular.yes} | Sucessfully enabled \`${cmd}\``)
                                ],
                                ephemeral: true
                            });
                        }
                    } else {
                        return interaction.reply({
                            embeds:[
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                .setDescription(`${e.regular.no} | The command stated has not been disabled`)
                            ],
                            ephemeral: true
                        });
                    }
                });
            }
            break;
        }
    }
}