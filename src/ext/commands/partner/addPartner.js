const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const Schema = require("../../../Strutcture/models/partner-channel");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "add-partner",
    description: "Add a partner's banner and server info to advertise them properly!",
    options: [
        {
            name: "partner-name",
            description: "The name of your new partner. e.i (The Developers)",
            required: true,
            type: "STRING",
        },
        {
            name: "invite-link",
            description: "The partners discord link",
            required: true,
            type: "STRING"
        },
        {
            name: "banner",
            description: "The advertisment banner (message, img link, etc)",
            required: true,
            type: "STRING"
        },
        {
            name: "channel",
            description: "The channel to advertise in (if you don't have any use the bot command to get one)",
            required: false,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"]
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const invLink = interaction.options.getString("invite-link");
        const bannerMsg = interaction.options.getString("banner");
        const channelToSend = interaction.options.getChannel("channel");
        const parterName = interaction.options.getString("partner-name");

        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                const Embed = new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                    .setDescription(bannerMsg)
                    .setAuthor({ name: `New Partnership: ${parterName}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

                const invite = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setURL(`${invLink}`)
                            .setLabel(`Support`)
                            .setStyle('LINK')
                    );

                const ch = interaction.guild.channels.cache.get(data.Channel);

                ch.send({ embeds: [Embed], components: [invite] });

                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.yes} | Successfully sent partnership news to <#${data.Channel}>`)
                    ],
                    ephemeral: true
                })
            } else {
                if (!channelToSend) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.no} | No channel has been set as the partner channel, please go back and fill in the channel you want!`)
                    ],
                    ephemeral: true
                })

                const Embed = new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                    .setDescription(bannerMsg)
                    .setAuthor({ name: `New Partnership: ${parterName}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

                const invite = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setURL(`${invLink}`)
                            .setLabel(`Support`)
                            .setStyle('LINK')
                    );

                channelToSend.send({ embeds: [Embed], components: [invite] });

                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.yes} | Successfully sent partnership news to ${channelToSend}`)
                    ],
                    ephemeral: true
                })
            }
        })
    }
}