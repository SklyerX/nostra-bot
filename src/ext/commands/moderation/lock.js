const { MessageEmbed, CommandInteraction } = require('discord.js');
const Schema = require("../../../Strutcture/models/set-logs");
const ee = require("../../../../data/embeds.json");


module.exports = {
    name: 'lock',
    description: "lock a channel to prevent users from typing",
    clientPerms: ["MANAGE_CHANNELS"],
    userPerms: ["MANAGE_CHANNELS"],
    options: [
        {
            name: "channel",
            description: "The channel you wish to lock",
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"],
            required: true
        }
    ],
    /** 
     * @param {CommandInteraction} interaction
    */
    async execute(interaction) {
        let role = interaction.guild.roles.everyone;

        const channel = interaction.options.getChannel("channel");

        try {
            channel.permissionOverwrites.edit(role, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                CREATE_INSTANT_INVITE: false,
            })
            await interaction.reply({ embeds: [new MessageEmbed().setAuthor({ name: "Channel Locked!", iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setDescription("This channel is now locked.\nPlease wait for a moderator to unlock the channel.").setFooter({ text: `/unlock to unlock the channel.` })
            .setColor(ee.color)
        ] })
        } catch (error) {
            await interaction.reply({ embeds: [new MessageEmbed().setAuthor({ name: "Error Found", iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setDescription("There has been an error while locking this channel. \n\nError: " + error)], ephemeral: true })
        }

        const data = await Schema.findOne({ Guild: interaction.guild.id });
        if (data) {
            const channel = interaction.guild.channels.cache.get(data.Channel)

            const embed4 = new MessageEmbed()
                .setTitle("Channel Locked")
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                .setDescription(`**Channel Locked:** <#${interaction.channel.id}> \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`)
                .setTimestamp()

            channel.send({ embeds: [embed4] })
        }



    }
}