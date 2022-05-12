const { MessageEmbed, CommandInteraction, MessageButton, MessageActionRow } = require('discord.js');
const Schema = require("../../../Strutcture/models/set-logs");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: 'hackban',
    description: "Ban a user that is not in the server",
    clientPerms: ["BAN_MEMBERS"],
    userPerms: ["BAN_MEMBERS"],
    options: [
        {
            name: "user",
            description: "The userID of the person you wish to hackban",
            required: true,
            type: "STRING"
        },
        {
            name: "reason",
            description: "The reason you want to hackban this user",
            required: true,
            type: "STRING"
        }
    ],
    /** 
     * @param {CommandInteraction} interaction
    */
    async execute(interaction, client) {


        const userID = interaction.options.getString("user");
        let reason = interaction.options.getString("reason");
        if (!reason) reason = "No reason given";

        if (isNaN(userID)) return await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                    .setDescription(`${e.regular.no} | The ID stated must be in a number state`)
            ]
        })

        let a = new MessageButton()
            .setCustomId('accept')
            .setStyle('SECONDARY')
            .setEmoji(e.regular.yes)

        let b = new MessageButton()
            .setCustomId('decline')
            .setStyle('SECONDARY')
            .setEmoji(e.regular.no)

        if (userID === interaction.user.id) return await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                    .setDescription(`${e.regular.no} | You cannot hackban yourself!`)
            ]
        })

        if (userID === client.user.id) return await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                    .setDescription(`${e.regular.no} | You cannot hackban me!`)
            ]
        })

        let row = new MessageActionRow().addComponents(a, b)
        const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 30000 })
        await interaction.reply({
            embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                .setTitle('Are you sure?').setDescription(`Are you sure you want to hack-ban <@${userID}> for \`${reason}\` ?`).addFields({ name: 'Click the according emoji to confirm', value: `${e.regular.yes} To hack-ban, ${e.regular.no} To cancel proccess` }).setColor(ee.color)], components: [row], ephemeral: true
        })

        collector.on('collect', async (m) => {
            if (m.customId === 'accept') {

                client.users.fetch(userID).then(async user => {
                    await interaction.guild.members.ban(user.id, { reason: reason });
                }).catch(error => {
                    throw error;
                })

                const data = await Schema.findOne({ Guild: interaction.guild.id });
                if (data) {
                    const channel = interaction.guild.channels.cache.get(data.Channel)

                    channel.send({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`**User:** <@${userID}> \n**Reason:** ${reason} \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`).setTitle("Member Hack-Banned")] })
                }

                a.setDisabled(true)
                b.setDisabled(true)
                row = new MessageActionRow().addComponents(a, b)
                m.update({ embeds: [new MessageEmbed().setTitle('Success').setDescription(`${e.regular.yes} | Hack-Ban <@${userID}> for **${reason}**`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })

            } else {
                a.setDisabled(true)
                b.setDisabled(true)
                m.update({ embeds: [new MessageEmbed().setTitle('Cancelled').setDescription(`${e.regular.yes} | Hack-Ban process has been terminated`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
            }
        });
    }
}