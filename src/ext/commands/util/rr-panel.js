const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const rrModel = require("../../../Strutcture/models/reaction-roles");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "panel",
    description: "Create the reaction role panel",
    userPerms: ["MANAGE_ROLES"],
    options: [
        {
            name: "channel",
            description: "The channel that you want the panel setup in",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"]
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const setupChannel = interaction.options.getChannel("channel");

        const guildData = await rrModel.findOne({ Guild: interaction.guild.id });

        if (!guildData?.Roles) return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`${e.regular.no} | No roles have been set in this server.`)
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            ],
            ephemeral: true
        });

        const options = guildData.Roles.map((x) => {
            const role = interaction.guild.roles.cache.get(x.roleId);

            return {
                label: role.name,
                value: role.id,
                description: x.roleDesc || "No Description was specified",
                emoji: x.roleEmoji
            };
        });

        const panelEmbed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setTitle("Please select a role from the menu below");

        const components = [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId("reaction-roles")
                    .setMaxValues(1)
                    .addOptions(options)
            )
        ]

        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`${e.regular.yes} | Successfully created the panel. \nChannel: <#${setupChannel.id}>`)
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            ],
            ephemeral: true
        });
        setupChannel.send({
            embeds: [panelEmbed],
            components: components
        });
    }
}