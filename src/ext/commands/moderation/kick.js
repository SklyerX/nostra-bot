const { MessageActionRow, MessageButton, CommandInteraction, MessageEmbed } = require('discord.js')
const Schema = require("../../../Strutcture/models/set-logs");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const d = require("../../../../data/punishmentIds.json");

module.exports = {
    name: 'kick',
    description: 'kick a user from the server',
    userPerms: ['kick_MEMBERS'],
    options: [
        {
            name: "member",
            description: "the user that you want to kick",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "The reason for this kick",
            required: false,
            type: "STRING"
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const kickMember = interaction.options.getMember("member");
        let kickReason = interaction.options.getString("reason");

        if (!kickReason) kickReason = interaction.user.tag + " No reason given";

        const Embed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

        if(kickMember.kickable) {
            if (kickMember.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({
                embeds: [Embed.setDescription(`${e.regular.no} | I cannot kick this user as their role is the same or higher than yours`)],
                ephemeral: true
            });

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
            interaction.reply({ embeds: [Embed.setTitle('Are you sure?').setDescription(`Are you sure you want to kick ${kickMember} for ${kickReason} ?`).addFields({ name: 'Click the according emoji to confirm', value: `${e.regular.yes} To kick, ${e.regular.no} To cancel proccess` }).setColor(ee.color)], components: [row], ephemeral: true })


            collector.on('collect', async (m) => {
                if (m.customId === 'accept') {
                    try {
                        kickMember.send({ embeds: [new MessageEmbed().setColor(ee.color).addField("Server Name", `${interaction.guild.name}`).addField("Reason", `${kickReason}`).addField("Punishment ID", `${d.kickId}`).setTitle(`Banned from ${interaction.guild.name}`).setFooter({ text: ee.footerText, iconURL: ee.footerIcon })]})
                    } catch (err) {
                        console.log(`${kickMember.id} was kicked in ${interaction.guild.name}. But I could not message them`)
                    }

                    const data = await Schema.findOne({ Guild: interaction.guild.id });
                    if (data) {
                        const channel = interaction.guild.channels.cache.get(data.Channel)

                        channel.send({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`**Member:** <@${kickMember.id}> \n**Reason:** ${kickReason} \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`).setTitle("Member Kicked")] })
                    }
                    kickMember.kick({ reason: kickReason || interaction.user.tag + ' No Reason Specified.' })
                    a.setDisabled(true)
                    b.setDisabled(true)
                    row = new MessageActionRow().addComponents(a, b)
                    m.update({ embeds: [new MessageEmbed().setTitle('Success').setDescription(`${e.regular.yes} | kicked ${kickMember} for **${kickReason}**`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })

                } else {
                    a.setDisabled(true)
                    b.setDisabled(true)
                    m.update({ embeds: [new MessageEmbed().setTitle('Cancelled').setDescription(`${e.regular.yes} | kick process has been terminated`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
                }
            });

        } else {
            interaction.reply({ embeds: [Embed.setDescription(`${e.regular.no} | I cannot kick this user`)], ephemeral: true });
        }
    }
}