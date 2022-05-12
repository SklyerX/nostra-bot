const { MessageActionRow, MessageButton, CommandInteraction, MessageEmbed } = require('discord.js')
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const d = require("../../../../data/punishmentIds.json");
const Schema = require("../../../Strutcture/models/set-logs");

module.exports = {
    name: 'ban',
    description: 'ban a member from the server',
    userPerms: ['BAN_MEMBERS'],
    options: [
        {
            name: "member",
            description: "the member that you want to ban",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "The reason for this ban",
            required: false,
            type: "STRING"
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const banMember = interaction.options.getMember("member");
        let banReason = interaction.options.getString("reason");

        if (!banReason) banReason = interaction.user.tag + " No reason given";

        const Embed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

        if (banMember.bannable) {
            if (banMember.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({
                embeds: [Embed.setDescription(`${e.regular.no} | I cannot ban this user as their role is the same or higher than yours`)],
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
            interaction.reply({ embeds: [Embed.setTitle('Are you sure?').setDescription(`Are you sure you want to ban ${banMember} for ${banReason} ?`).addFields({ name: 'Click the according emoji to confirm', value: `${e.regular.yes} To ban, ${e.regular.no} To cancel proccess` }).setColor(ee.color)], components: [row], ephemeral: true })

            collector.on('collect', async (m) => {
                if (m.customId === 'accept') {
                    try {
                        await banMember.send({ embeds: [new MessageEmbed().setColor(ee.color).addField("Server Name", `${interaction.guild.name}`).addField("Reason", `${banReason}`).addField("Punishment ID", `${d.banId}`).setTitle(`Banned from ${interaction.guild.name}`).setFooter({ text: ee.footerText, iconURL: ee.footerIcon })] })
                    } catch (err) {
                        console.log(`${banMember.id} was banned in ${interaction.guild.name}. But I could not message them`)
                    }

                    const data = await Schema.findOne({ Guild: interaction.guild.id });
                    if (data) {
                        const channel = interaction.guild.channels.cache.get(data.Channel)

                        channel.send({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`**Member:** <@${banMember.id}> \n**Reason:** ${banReason} \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`).setTitle("Member Banned")] })
                    }

                    await banMember.ban({ reason: banReason || + interaction.user.tag + ' No Reason Specified.' })
                    a.setDisabled(true)
                    b.setDisabled(true)
                    row = new MessageActionRow().addComponents(a, b)
                    m.update({ embeds: [new MessageEmbed().setTitle('Success').setDescription(`${e.regular.yes} | Banned ${banMember} for **${banReason}**`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })

                } else {
                    a.setDisabled(true)
                    b.setDisabled(true)
                    m.update({ embeds: [new MessageEmbed().setTitle('Cancelled').setDescription(`${e.regular.yes} | Ban process has been terminated`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
                }
            });

        } else {
            interaction.reply({ embeds: [Embed.setDescription(`${e.regular.no} | I cannot ban this user`)], ephemeral: true });
        }
    }
}