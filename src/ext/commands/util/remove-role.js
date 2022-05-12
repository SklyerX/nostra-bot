const { CommandInteraction, MessageEmbed } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "removerole",
    description: "remove a role from a member",
    userPerms: ["MANAGE_ROLES"],
    clientPerms: ["MANAGE_ROLES"],
    options: [
        {
            name: "member",
            description: "The member that you want to remove the role from",
            required: true,
            type: "USER"
        },
        {
            name: "role",
            description: "The role that you want to remove from this member",
            required: true,
            type: "ROLE"
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const Target = interaction.options.getMember("member");
        const Role = interaction.options.getRole("role");

        if(!Target.roles.cache.has(Role.id)) return await interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                .setDescription(`${e.regular.no} | This member does not have the role \`${Role.name}\``)
            ], ephemeral: true
        })
        await Target.roles.remove(Role);

        await interaction.reply({ embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setDescription(`${e.regular.yes} | Successfully removed <@&${Role.id}> To <@${Target.id}>`)
        ], })
    }
}