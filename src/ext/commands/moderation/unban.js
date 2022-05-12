const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const Schema = require("../../../Strutcture/models/set-logs");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "unban",
    description: "unban an id that was banned from the server!",
    userPerms: ["BAN_MEMBERS"],
    clientPerms: ["BAN_MEMBERS"],
    options: [
        {
            name: "user",
            description: "The user ID you wish to unban",
            required: true,
            type: "STRING"
        },
        {
            name: "reason",
            description: "The reason you want to unban this user",
            required: true,
            type: "STRING"
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const Target = interaction.options.getString("user");
        let Reason = interaction.options.getString("reason");

        if (!Reason) Reason = interaction.user.tag + " No reason specified";

        await interaction.guild.bans.fetch().then(async (bans) => {
            if (bans.size === 0) return await interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setDescription(`${e.regular.no} | This server has no users banned`)
                ],
                ephemeral: true
            });
            let bannedID = bans.find((ban) => ban.user.id == Target);
            if (!bannedID) return await interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setDescription(`${e.regular.no} | The ID stated is not banned from the server`)
                ],
                ephemeral: true
            })



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
            await interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                    .setTitle('Are you sure?').setDescription(`Are you sure you want to unban <@${Target}> for \`${Reason}\` ?`).addFields({ name: 'Click the according emoji to confirm', value: `${e.regular.yes} To unban, ${e.regular.no} To cancel proccess` }).setColor(ee.color)], components: [row], ephemeral: true
            })


            collector.on('collect', async (m) => {
                if (m.customId === 'accept') {
                    await interaction.guild.bans.remove(Target, Reason).catch((err) => console.log(err));
                    await interaction.channel.send({
                        embeds: [
                            new MessageEmbed()
                                .setColor(ee.color)
                                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                                .setDescription(`${e.regular.yes} | Successfully unbanned **${Target}**`)
                        ]
                    })

                    const data = await Schema.findOne({ Guild: interaction.guild.id });
                    if (data) {
                        const channel = interaction.guild.channels.cache.get(data.Channel)

                        channel.send({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`**Member:** <@${Target}> \n**Reason:** ${Reason} \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`).setTitle("Member Unbanned")] })
                    }
                    a.setDisabled(true)
                    b.setDisabled(true)
                    row = new MessageActionRow().addComponents(a, b)
                    m.update({ embeds: [new MessageEmbed().setTitle('Success').setDescription(`${e.regular.yes} | unbanned <@${Target}> for **${Reason}**`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })

                } else {
                    a.setDisabled(true)
                    b.setDisabled(true)
                    m.update({ embeds: [new MessageEmbed().setTitle('Cancelled').setDescription(`${e.regular.yes} | Unban process has been terminated`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
                }
            });
        });
    }
}