const { MessageEmbed, CommandInteraction } = require('discord.js');
const Schema = require("../../../Strutcture/models/set-logs");
const ee = require("../../../../data/embeds.json");


module.exports = {
    name: 'unlock',
    description: "unlock the locked channel",
    clientPerms: ["MANAGE_CHANNELS"],
    userPerms: ["MANAGE_CHANNELS"],
    options: [
        {
            name: "channel",
            description: "The channel you wish to unlock",
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
                SEND_MESSAGES: true,
                ADD_REACTIONS: true,
                CREATE_INSTANT_INVITE: null,
            })
            await interaction.reply({ embeds: [new MessageEmbed().setAuthor({ name: "Channel Locked!", iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setDescription("This channel is now unlocked")
            .setColor(ee.color)
        ] })
        } catch (error) {
            await interaction.reply({ embeds: [new MessageEmbed().setAuthor({ name: "Error Found", iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setDescription("There has been an error while locking this channel. \n\nError: " + error)], ephemeral: true })
        }

        const data = await Schema.findOne({ Guild: interaction.guild.id });
        if (data) {
            const channel = interaction.guild.channels.cache.get(data.Channel)

            const embed4 = new MessageEmbed()
                .setTitle("Channel Unlocked")
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                .setDescription(`**Channel Unlocked:** <#${interaction.channel.id}> \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`)
                .setTimestamp()

            channel.send({ embeds: [embed4] })
        }
    }
}