const { CommandInteraction, MessageEmbed } = require('discord.js')
const Schema = require("../../../Strutcture/models/set-logs");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: 'slowmode',
    description: 'Set a slowmode delay for a channel',
    userPerms: ['MANAGE_CHANNELS'],
    clientPerms: ['MANAGE_CHANNELS'],
    options: [
        {
            name: "channel",
            description: "The channel you want to change the slowmode",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"],
        },
        {
            name: "delay",
            description: "The delay you want the channel to have. Delay must be between (0 - 21600)",
            required: true,
            type: "NUMBER",
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */

    async execute(interaction) {
        const channel = interaction.options.getChannel("channel");
        const delay = interaction.options.getNumber("delay");

        const tomuch = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setTitle(e.regular.no + ' Please Specify a Valid slowmode')
            .setDescription('Valid slowmodes are from 0s - 21600s')

        const negative = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setTitle(e.regular.no + ' Please Specify a Valid slowmode')
            .setDescription('Valid slowmodes are positive number in seconds')

        const valid = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setTitle(e.regular.no + ' Please Specify a Valid slowmode')
            .setDescription('Valid slowmodes are positive numbers from 0s - 21600s')

        if (isNaN(delay)) return await interaction.reply({ embeds: [valid], ephemeral: true })

        if (delay < 0) return await interaction.reply({ embeds: [negative], ephemeral: true })
        if (delay > 21600) return await interaction.reply({ embeds: [tomuch], ephemeral: true })

        channel.setRateLimitPerUser(delay)

        const embed = new MessageEmbed()
            .setTitle(`Slowmode Set to \`${delay}\` seconds`)
            .setColor('BLUE')

        await interaction.reply({ embeds: [embed], ephemeral: true })

        const data = await Schema.findOne({ Guild: interaction.guild.id });

        if (data) {
            const logChannel = interaction.guild.channels.cache.get(data.Channel)

            logChannel.send({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`**Channel:** <#${channel.id}> \n**Delay:** \`${delay}s\` \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`).setTitle("Channel Slowmode Updated")] })
        }
    }
}