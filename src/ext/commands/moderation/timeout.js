const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const ms = require("ms");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const d = require("../../../../data/punishmentIds.json");
const Schema = require("../../../Strutcture/models/set-logs");

module.exports = {
    name: "timeout",
    description: "timeout a user in the server",
    clientPerms: ["TIMEOUT_MEMBERS"],
    userPerms: ["TIMEOUT_MEMBERS"],
    options: [
        {
            name: "user",
            description: "The user you want to timeout",
            required: true,
            type: "USER",
        },
        {
            name: "duration",
            description: "the duration you would like to timeout this user for",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "60 Second",
                    value: "60s"
                },
                {
                    name: "5 Min",
                    value: "5min",
                },
                {
                    name: "10 Min",
                    value: "10m"
                },
                {
                    name: "1 Hour",
                    value: "1h"
                },
                {
                    name: "1 Day",
                    value: "1d"
                },
                {
                    name: "1 Week",
                    value: "1w"
                }
            ]
        },
        {
            name: "reason",
            description: "THe reason for this timeout",
            required: true,
            type: "STRING"
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild, member, options } = interaction;

        const Target = options.getMember("user");
        const Target1 = options.getUser("user");
        const choice = options.getString("duration");
        let Reason = options.getString("reason");

        if (!Reason) Reason = "No reason specified";

        switch (choice) {
            case "60s": {
                let a = new MessageButton()
                    .setCustomId('accept')
                    .setStyle('SECONDARY')
                    .setEmoji(e.regular.yes)

                let b = new MessageButton()
                    .setCustomId('decline')
                    .setStyle('SECONDARY')
                    .setEmoji(e.regular.no)

                let row = new MessageActionRow().addComponents(a, b)
                const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 30000 })
                interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setTitle('Are you sure?').setDescription(`Are you sure you want to timeout ${Target} for \`${Reason}\`?`).addFields({ name: 'Click the according emoji to confirm', value: `${e.regular.yes} To timeout, ${e.regular.no} To cancel proccess` }).setColor(ee.color)], components: [row], ephemeral: true
                });

                collector.on('collect', async (m) => {
                    if (m.customId === 'accept') {
                        try {
                            Target.send({ embeds: [new MessageEmbed().setColor(ee.color).addField("Server Name", `${interaction.guild.name}`).addField("Reason", `${Reason}`).addField("Duration", `60s`).addField("Punishment ID", `${d.timeout}`).setTitle(`Timeouted in ${interaction.guild.name}`).setFooter({ text: ee.footerText, iconURL: ee.footerIcon })] })
                        } catch (err) {
                            console.log(`${Target.id} was timedout in ${interaction.guild.name}. But I could not message them`)
                        }

                        try {
                            Target.setNickname("[Timeout] " + Target1.username);
                        } catch (err) {
                            console.log(err);
                        }

                        const data = await Schema.findOne({ Guild: interaction.guild.id });
                        if (data) {
                            const channel = interaction.guild.channels.cache.get(data.Channel)

                            channel.send({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`**Member:** <@${Target.id}> \n**Duration:** \`60s\` \n**Reason:** ${Reason} \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`).setTitle("Member Timedout")] })
                        }

                        await Target.timeout(ms("60s"), Reason)
                        a.setDisabled(true)
                        b.setDisabled(true)
                        row = new MessageActionRow().addComponents(a, b)
                        m.update({ embeds: [new MessageEmbed().setTitle('Success').setDescription(`${e.regular.yes} | Timedout ${Target} for **${Reason}**`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })

                    } else {
                        a.setDisabled(true)
                        b.setDisabled(true)
                        m.update({ embeds: [new MessageEmbed().setTitle('Cancelled').setDescription(`${e.regular.yes} | Timeout process has been terminated`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
                    }
                });
            }
                break;
            case "5min": {
                let a = new MessageButton()
                    .setCustomId('accept')
                    .setStyle('SECONDARY')
                    .setEmoji(e.regular.yes)

                let b = new MessageButton()
                    .setCustomId('decline')
                    .setStyle('SECONDARY')
                    .setEmoji(e.regular.no)

                let row = new MessageActionRow().addComponents(a, b)
                const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 30000 })
                interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setTitle('Are you sure?').setDescription(`Are you sure you want to timeout ${Target} for \`${Reason}\`?`).addFields({ name: 'Click the according emoji to confirm', value: `${e.regular.yes} To timeout, ${e.regular.no} To cancel proccess` }).setColor(ee.color)], components: [row], ephemeral: true
                });

                collector.on('collect', async (m) => {
                    if (m.customId === 'accept') {
                        try {
                            Target.send({ embeds: [new MessageEmbed().setColor(ee.color).addField("Server Name", `${interaction.guild.name}`).addField("Reason", `${Reason}`).addField("Duration", `5m`).addField("Punishment ID", `${d.timeout}`).setTitle(`Timeouted in ${interaction.guild.name}`).setFooter({ text: ee.footerText, iconURL: ee.footerIcon })] })
                        } catch (err) {
                            console.log(`${Target.id} was timedout in ${interaction.guild.name}. But I could not message them`)
                        }

                        try {
                            Target.setNickname("[Timeout] " + Target1.username);
                        } catch (err) {
                            console.log(err);
                        }

                        const data = await Schema.findOne({ Guild: interaction.guild.id });
                        if (data) {
                            const channel = interaction.guild.channels.cache.get(data.Channel)

                            channel.send({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`**Member:** <@${Target.id}> \n**Duration:** \`5min\` \n**Reason:** ${Reason} \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`).setTitle("Member Timedout")] })
                        }

                        await Target.timeout(ms("5m"), Reason)
                        a.setDisabled(true)
                        b.setDisabled(true)
                        row = new MessageActionRow().addComponents(a, b)
                        await m.update({ embeds: [new MessageEmbed().setTitle('Success').setDescription(`${e.regular.yes} | Timedout ${Target} for **${Reason}**`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
                    } else {
                        a.setDisabled(true)
                        b.setDisabled(true)
                        await m.update({ embeds: [new MessageEmbed().setTitle('Cancelled').setDescription(`${e.regular.yes} | Timeout process has been terminated`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
                    }
                });
            }
            break;
            case "10m": {
                let a = new MessageButton()
                    .setCustomId('accept')
                    .setStyle('SECONDARY')
                    .setEmoji(e.regular.yes)

                let b = new MessageButton()
                    .setCustomId('decline')
                    .setStyle('SECONDARY')
                    .setEmoji(e.regular.no)

                let row = new MessageActionRow().addComponents(a, b)
                const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 30000 })
                interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setTitle('Are you sure?').setDescription(`Are you sure you want to timeout ${Target} for \`${Reason}\`?`).addFields({ name: 'Click the according emoji to confirm', value: `${e.regular.yes} To timeout, ${e.regular.no} To cancel proccess` }).setColor(ee.color)], components: [row], ephemeral: true
                });

                collector.on('collect', async (m) => {
                    if (m.customId === 'accept') {
                        try {
                            Target.send({ embeds: [new MessageEmbed().setColor(ee.color).addField("Server Name", `${interaction.guild.name}`).addField("Reason", `${Reason}`).addField("Duration", `10m`).addField("Punishment ID", `${d.timeout}`).setTitle(`Timeouted in ${interaction.guild.name}`).setFooter({ text: ee.footerText, iconURL: ee.footerIcon })] })
                        } catch (err) {
                            console.log(`${Target.id} was timedout in ${interaction.guild.name}. But I could not message them`)
                        }

                        try {
                            Target.setNickname("[Timeout] " + Target1.username);
                        } catch (err) {
                            console.log(err);
                        }

                        const data = await Schema.findOne({ Guild: interaction.guild.id });
                        if (data) {
                            const channel = interaction.guild.channels.cache.get(data.Channel)

                            channel.send({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`**Member:** <@${Target.id}> \n**Duration:** \`10m\` \n**Reason:** ${Reason} \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`).setTitle("Member Timedout")] })
                        }

                        await Target.timeout(ms("10m"), Reason)
                        a.setDisabled(true)
                        b.setDisabled(true)
                        row = new MessageActionRow().addComponents(a, b)
                        m.update({ embeds: [new MessageEmbed().setTitle('Success').setDescription(`${e.regular.yes} | Timedout ${Target} for **${Reason}**`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })

                    } else {
                        a.setDisabled(true)
                        b.setDisabled(true)
                        m.update({ embeds: [new MessageEmbed().setTitle('Cancelled').setDescription(`${e.regular.yes} | Timeout process has been terminated`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
                    }
                });
            }
            break;
            case "1h": {
                let a = new MessageButton()
                    .setCustomId('accept')
                    .setStyle('SECONDARY')
                    .setEmoji(e.regular.yes)

                let b = new MessageButton()
                    .setCustomId('decline')
                    .setStyle('SECONDARY')
                    .setEmoji(e.regular.no)

                let row = new MessageActionRow().addComponents(a, b)
                const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 30000 })
                interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setTitle('Are you sure?').setDescription(`Are you sure you want to timeout ${Target} for \`${Reason}\`?`).addFields({ name: 'Click the according emoji to confirm', value: `${e.regular.yes} To timeout, ${e.regular.no} To cancel proccess` }).setColor(ee.color)], components: [row], ephemeral: true
                });

                collector.on('collect', async (m) => {
                    if (m.customId === 'accept') {
                        try {
                            Target.send({ embeds: [new MessageEmbed().setColor(ee.color).addField("Server Name", `${interaction.guild.name}`).addField("Reason", `${Reason}`).addField("Duration", `1h`).addField("Punishment ID", `${d.timeout}`).setTitle(`Timeouted in ${interaction.guild.name}`).setFooter({ text: ee.footerText, iconURL: ee.footerIcon })] })
                        } catch (err) {
                            console.log(`${Target.id} was timedout in ${interaction.guild.name}. But I could not message them`)
                        }

                        try {
                            Target.setNickname("[Timeout] " + Target1.username);
                        } catch (err) {
                            console.log(err);
                        }

                        const data = await Schema.findOne({ Guild: interaction.guild.id });
                        if (data) {
                            const channel = interaction.guild.channels.cache.get(data.Channel)

                            channel.send({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`**Member:** <@${Target.id}> \n**Duration:** \`1h\` \n**Reason:** ${Reason} \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`).setTitle("Member Timedout")] })
                        }

                        await Target.timeout(ms("1h"), Reason)
                        a.setDisabled(true)
                        b.setDisabled(true)
                        row = new MessageActionRow().addComponents(a, b)
                        m.update({ embeds: [new MessageEmbed().setTitle('Success').setDescription(`${e.regular.yes} | Timedout ${Target} for **${Reason}**`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })

                    } else {
                        a.setDisabled(true)
                        b.setDisabled(true)
                        m.update({ embeds: [new MessageEmbed().setTitle('Cancelled').setDescription(`${e.regular.yes} | Timeout process has been terminated`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
                    }
                });
            }
            break;
            case "1d": {
                let a = new MessageButton()
                    .setCustomId('accept')
                    .setStyle('SECONDARY')
                    .setEmoji(e.regular.yes)

                let b = new MessageButton()
                    .setCustomId('decline')
                    .setStyle('SECONDARY')
                    .setEmoji(e.regular.no)

                let row = new MessageActionRow().addComponents(a, b)
                const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 30000 })
                interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setTitle('Are you sure?').setDescription(`Are you sure you want to timeout ${Target} for \`${Reason}\`?`).addFields({ name: 'Click the according emoji to confirm', value: `${e.regular.yes} To timeout, ${e.regular.no} To cancel proccess` }).setColor(ee.color)], components: [row], ephemeral: true
                });

                collector.on('collect', async (m) => {
                    if (m.customId === 'accept') {
                        try {
                            Target.send({ embeds: [new MessageEmbed().setColor(ee.color).addField("Server Name", `${interaction.guild.name}`).addField("Reason", `${Reason}`).addField("Duration", `1d`).addField("Punishment ID", `${d.timeout}`).setTitle(`Timeouted in ${interaction.guild.name}`).setFooter({ text: ee.footerText, iconURL: ee.footerIcon })] })
                        } catch (err) {
                            console.log(`${Target.id} was timedout in ${interaction.guild.name}. But I could not message them`)
                        }

                        try {
                            Target.setNickname("[Timeout] " + Target1.username);
                        } catch (err) {
                            console.log(err);
                        }

                        const data = await Schema.findOne({ Guild: interaction.guild.id });
                        if (data) {
                            const channel = interaction.guild.channels.cache.get(data.Channel)

                            channel.send({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`**Member:** <@${Target.id}> \n**Duration:** \`1d\` \n**Reason:** ${Reason} \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`).setTitle("Member Timedout")] })
                        }

                        await Target.timeout(ms("1d"), Reason)
                        a.setDisabled(true)
                        b.setDisabled(true)
                        row = new MessageActionRow().addComponents(a, b)
                        m.update({ embeds: [new MessageEmbed().setTitle('Success').setDescription(`${e.regular.yes} | Timedout ${Target} for **${Reason}**`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })

                    } else {
                        a.setDisabled(true)
                        b.setDisabled(true)
                        m.update({ embeds: [new MessageEmbed().setTitle('Cancelled').setDescription(`${e.regular.yes} | Timeout process has been terminated`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
                    }
                });
            }
            break;
            case "1w": {
                let a = new MessageButton()
                    .setCustomId('accept')
                    .setStyle('SECONDARY')
                    .setEmoji(e.regular.yes)

                let b = new MessageButton()
                    .setCustomId('decline')
                    .setStyle('SECONDARY')
                    .setEmoji(e.regular.no)

                let row = new MessageActionRow().addComponents(a, b)
                const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 30000 })
                interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setTitle('Are you sure?').setDescription(`Are you sure you want to timeout ${Target} for \`${Reason}\`?`).addFields({ name: 'Click the according emoji to confirm', value: `${e.regular.yes} To timeout, ${e.regular.no} To cancel proccess` }).setColor(ee.color)], components: [row], ephemeral: true
                });

                collector.on('collect', async (m) => {
                    if (m.customId === 'accept') {
                        try {
                            Target.send({ embeds: [new MessageEmbed().setColor(ee.color).addField("Server Name", `${interaction.guild.name}`).addField("Reason", `${Reason}`).addField("Duration", `1w`).addField("Punishment ID", `${d.timeout}`).setTitle(`Timeouted in ${interaction.guild.name}`).setFooter({ text: ee.footerText, iconURL: ee.footerIcon })] })
                        } catch (err) {
                            console.log(`${Target.id} was timedout in ${interaction.guild.name}. But I could not message them`)
                        }

                        try {
                            Target.setNickname("[Timeout] " + Target1.username);
                        } catch (err) {
                            console.log(err);
                        }

                        const data = await Schema.findOne({ Guild: interaction.guild.id });
                        if (data) {
                            const channel = interaction.guild.channels.cache.get(data.Channel)

                            channel.send({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`**Member:** <@${Target.id}> \n**Duration:** \`1w\` \n**Reason:** ${Reason} \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`).setTitle("Member Timedout")] })
                        }

                        await Target.timeout(ms("1w"), Reason)
                        a.setDisabled(true)
                        b.setDisabled(true)
                        row = new MessageActionRow().addComponents(a, b)
                        m.update({ embeds: [new MessageEmbed().setTitle('Success').setDescription(`${e.regular.yes} | Timedout ${Target} for **${Reason}**`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })

                    } else {
                        a.setDisabled(true)
                        b.setDisabled(true)
                        m.update({ embeds: [new MessageEmbed().setTitle('Cancelled').setDescription(`${e.regular.yes} | Timeout process has been terminated`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
                    }
                });
            }
            break;
        }
    }
}