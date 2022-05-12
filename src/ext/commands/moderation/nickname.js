const { MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require('discord.js')
const Schema = require("../../../Strutcture/models/set-logs");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "nickname",
    description: "Change a members nickname",
    clientPerms: ["MANAGE_NICKANMES"],
    userPerms: ["MANAGE_NICKANMES"],
    options: [
        {
            name: "member",
            description: "The member that you want to change their nickname to",
            required: true,
            type: "USER",
        },
        {
            name: "nickname", description: "The nickname that you want to set to this member.",
            required: true,
            type: "STRING",
        },
        {
            name: "reason",
            description: "The reason you want to change this members nickname.",
            type: "STRING",
            required: false,
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const Target = interaction.options.getMember("member");
        const Target1 = interaction.options.getUser("member");
        const nickname = interaction.options.getString("nickname");
        let Reason = interaction.options.getString("reason");

        if (!Reason) Reason = "No reason specified";

        let a = new MessageButton()
            .setCustomId('accept')
            .setStyle("SECONDARY")
            .setEmoji(e.regular.yes)

        let b = new MessageButton()
            .setCustomId('decline')
            .setStyle("SECONDARY")
            .setEmoji(e.regular.no)

        let row = new MessageActionRow().addComponents(a, b)
        const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 30000 });

        await interaction.reply({
            embeds: [new MessageEmbed().setDescription(`Are You Sure U Want To Change <@${Target1.id}> nickname to **${nickname}** ?\n ${e.regular.yes} To Confirm | ${e.regular.no} To Cancel`)
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })], components: [row],
            ephemeral: true
        })

        collector.on('collect', async (m) => {
            if (m.customId === 'accept') {
                const data = await Schema.findOne({ Guild: interaction.guild.id });
                if (data) {
                    const logs = interaction.guild.channels.cache.get(data.Channel)

                    logs.send({
                        embeds: [new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setThumbnail(Target1.displayAvatarURL({ dynamic: true }))
                            .setTitle("Member Updated")
                            .addField("**Nickname Changed From**", `${Target.displayName}`)
                            .addField("**Nickname Changed By**", `<@${interaction.user.id}>`)
                            .addField("Nickname Changed To", `${nickname}`)
                            .setTimestamp()
                        ]
                    });

                    Target.setNickname(nickname)
                    row = new MessageActionRow().addComponents(a, b)
                    a.setDisabled(true);
                    b.setDisabled(true);
                    m.update({ embeds: [new MessageEmbed().setTitle('Success').setDescription(`${e.regular.yes} |  Successfully changed <@${Target.id}>'s nickname to \`${nickname}\``).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
                }
            }

            if (m.customId === 'decline') {
                a.setDisabled(true);
                b.setDisabled(true);
                await m.update({ embeds: [new MessageEmbed().setTitle('Cancelled').setDescription(`${e.regular.yes} | Nickname-Changing process has been terminated`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
            }
        })
    }
}