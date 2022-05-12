const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const rrModel = require("../../../Strutcture/models/reaction-roles");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "remove-role",
    description: "remove a custom reaction role",
    userPerms: ["MANAGE_ROLES"],
    options: [
        {
            name: "role",
            description: "role to be removed.",
            type: "ROLE",
            required: true
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const role = interaction.options.getRole("role");

        if (role.position >= interaction.guild.me.roles.highest.position) return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`${e.regular.no} | The role you have specified is higher or equal to mine!`)
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            ],
            ephemeral: true
        });

        const guildData = await rrModel.findOne({ Guild: interaction.guild.id });

        if (!guildData) return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`${e.regular.no} | No roles have been set in this server.`)
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            ],
            ephemeral: true
        });

        const guildRoles = guildData.Roles;

        const findRole = guildRoles.find((x) => x.roleId === role.id);
        if (!findRole) return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`${e.regular.no} | The role stated was not found in the reaction role list nor our database.`)
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            ],
            ephemeral: true
        });

        const filteredRoles = guildRoles.filter((x) => x.roleId !== role.id);
        guildData.Roles = filteredRoles;

        await guildData.save();

        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`${e.regular.yes} | Successfully removed \`${role.name}\``)
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            ],
            ephemeral: true
        });
    }
}