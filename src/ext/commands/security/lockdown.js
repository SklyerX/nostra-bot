const { CommandInteraction, MessageEmbed, Permissions, Client, MessageActionRow, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const Schema = require("../../../Strutcture/models/set-logs");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    ...new SlashCommandBuilder()
        .setName('lockdown')
        .setDescription('lockdown you\'re server and prevent mass message spams and mass call spams')
        .addStringOption(option =>
            option.setName('value')
                .setDescription('ON/OFF')
                .setRequired(true)
                .addChoice('ON', 'ON')
                .addChoice('OFF', 'OFF')
        )
        .addStringOption(option => option.setName('reason').setDescription('The reason for this lockdown. (this alert will be shown to the users also)')),
    clientPerms: ["MANAGE_CHANNELS"],
    userPerms: ["ADMINISTRATOR"],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        var value = interaction.options.get('value').value;
        var Reason = interaction.options.getString("reason");

        if (!Reason) Reason = "This server is under lockdown for the time being. The moderator did not describe the reason for this lockdown but the options listed below are a possiblity \n\n> Raid In Progress \n> Updating Server \n> Accidental"

        const role = interaction.guild.roles.everyone;

        const perms = role.permissions.toArray()

        if (value === 'ON') {
            if (!role.permissions.has("VIEW_CHANNEL")) {
                return await interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setDescription(`${e.regular.no} | Lockdown protocol is already active.`)
                    ], ephemeral: true
                });
            } else {
                let newPerms = interaction.guild.roles.everyone.permissions.remove("VIEW_CHANNEL")
                await role.edit({ permissions: newPerms }).then(async() => {
                    const data = await Schema.findOne({ Guild: interaction.guild.id });

                    if (data) {
                        const channel = interaction.guild.channels.cache.get(data.Channel)
    
                        const embed4 = new MessageEmbed()
                            .setTitle("Server Lockdown Initiated")
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`**Moderator:** <@${interaction.user.id}> (${interaction.user.id}) \n**Reason:** ${Reason || "No reason specified"} \n\n**Note:** All channels are locked and members cannot view any channel. use **/lockdown \`value:\` \`OFF\` to let the members view the channels again.**`)
                            .setTimestamp()
    
                        channel.send({ embeds: [embed4] })
                    }
                });

                const newChannel = await interaction.guild.channels.create(`🔒-server-lockdown`, {
                    type: "GUILD_TEXT",
                    permissionOverwrites: [
                        {
                            id: role.id,
                            allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                        },
                    ]
                })

                client.channels.cache.get(newChannel.id).send({
                    content: "@everyone", embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`This server is undergoing lockdown. You will see the channel(s) once the lockdown is lifted. The reason for this lockdown is \n\n> ${Reason}`)
                            .setImage("https://cdn.dribbble.com/users/844846/screenshots/6597219/shield_animation.gif")
                    ],
                });

                const turnedOn = new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                    .setDescription(`${e.regular.yes} | Successfully locked the server.`)

                await interaction.reply({ embeds: [turnedOn], ephemeral: true })
            }
        }
        if (value === 'OFF') {
            if (role.permissions.has("VIEW_CHANNEL")) return await interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                    .setDescription(`${e.regular.no} | Lockdown system is already turned off!`)
                ], ephemeral: true
            });
            perms.push("VIEW_CHANNEL");
            await role.edit({ permissions: perms });

            let lockDownChat = interaction.guild.channels.cache.find((ch) => ch.name === "🔒-server-lockdown")

            
            try {
                if (lockDownChat) {
                    lockDownChat.delete();
                }
            } catch (err) {
                throw err;
            }

            const turnedOff = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setDescription(`${e.regular.yes} | Successfully unlocked the server.`)
            
            const data = await Schema.findOne({ Guild: interaction.guild.id });
            if (data) {
                const channel = interaction.guild.channels.cache.get(data.Channel)

                const embed4 = new MessageEmbed()
                    .setTitle("Server Lockdown Lifted")
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                    .setDescription(`**Moderator:** <@${interaction.user.id}> (${interaction.user.id}) \n**Reason:** ${Reason || "No reason specified"} \n\n**Note:** Member's now can view all the channels`)
                    .setTimestamp()

                channel.send({ embeds: [embed4] })
            }
            await interaction.reply({ embeds: [turnedOff], ephemeral: true })
        }

        // const Embed = new MessageEmbed()
        //     .setColor(ee.color)
        //     .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
        //     .setDescription(`${e.regular.yes} | Works`)

        // interaction.reply({ embeds: [Embed], ephemeral: true })
    }
}