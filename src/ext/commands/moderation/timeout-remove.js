const { MessageActionRow, MessageButton, CommandInteraction, MessageEmbed } = require('discord.js')
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const d = require("../../../../data/punishmentIds.json");
const Schema = require("../../../Strutcture/models/set-logs");

module.exports = {
    name: 'timeout-remove',
    description: 'Remove a members timeout',
    userPerms: ['TIMEOUT_MEMBERS'],
    clientPerms: ["TIMEOUT_MEMBERS"],
    options: [
        {
            name: "member",
            description: "The member that you want to remove their timeout",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "The reason you want to remove this member's timeout",
            required: false,
            type: "STRING"
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const Target = interaction.options.getMember("member");
        let Reason = interaction.options.getString("reason");

        if (!Reason) Reason = "[" + interaction.user.tag + "]" + " No Reason Specified";

        const Embed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

        if (Target.manageable) {
            if (Target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({
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
            interaction.reply({ embeds: [Embed.setTitle('Are you sure?').setDescription(`Are you sure you want to ban ${Target} for ${Reason} ?`).addFields({ name: 'Click the according emoji to confirm', value: `${e.regular.yes} To ban, ${e.regular.no} To cancel proccess` }).setColor(ee.color)], components: [row], ephemeral: true })

            collector.on('collect', async (m) => {
                if (m.customId === 'accept') {
                    try {
                        Target.setNickname(null);
                    } catch (err) {
                        console.log(err);
                    }
    
                    const data = await Schema.findOne({ Guild: interaction.guild.id });
                    if (data) {
                        const channel = interaction.guild.channels.cache.get(data.Channel)
    
                        channel.send({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`**Member:** <@${Target.id}> \n**Reason:** ${Reason} \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`).setTitle("Member Timeout Removed")] })
                    }
                    
                    Target.timeout(0, Reason)
                    a.setDisabled(true)
                    b.setDisabled(true)
                    row = new MessageActionRow().addComponents(a, b)
                    m.update({ embeds: [new MessageEmbed().setTitle('Success').setDescription(`${e.regular.yes} | Removed ${Target}'s timeout for the reason of **${Reason}**`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
                } else {
                    a.setDisabled(true)
                    b.setDisabled(true)
                    m.update({ embeds: [new MessageEmbed().setTitle('Cancelled').setDescription(`${e.regular.yes} | Timeout-Remove process has been terminated`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
                }
            });

        } else {
            interaction.reply({ embeds: [Embed.setDescription(`${e.regular.no} | I cannot timeout this member`)], ephemeral: true });
        }
    }
}