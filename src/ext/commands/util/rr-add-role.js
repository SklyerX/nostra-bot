const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const rrModel = require("../../../Strutcture/models/reaction-roles");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "add-role",
    description: "add a custom reaction role",
    userPerms: ["MANAGE_ROLES"],
    options: [
        {
            name: "role",
            description: "role to be assigned",
            type: "ROLE",
            required: true
        },
        {
            name: "description",
            description: "description of this role",
            type: "STRING",
            required: false
        },
        {
            name: "emoji",
            description: "The emoji for the role",
            type: "STRING",
            required: false
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const role = interaction.options.getRole("role");
        const roleDesc = interaction.options.getString("description") || null;
        const roleEmoji = interaction.options.getString("emoji") || null;

        if(role.position >= interaction.guild.me.roles.highest.position) return interaction.reply({
            embeds: [
                new MessageEmbed()
                .setDescription(`${e.regular.no} | The role you have specified is higher or equal to mine!`)
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            ],
            ephemeral: true
        });

        const guildData = await rrModel.findOne({ Guild: interaction.guild.id });

        const newRole = {
            roleId: role.id,
            roleDesc,
            roleEmoji
        };

        if(guildData) {
            const roleData = guildData.Roles.find((x) => x.roleId === role.id);

            if(roleData) {
                roleData = newRole;
            } else {
                guildData.Roles = [...guildData.Roles, newRole];
            }

            await guildData.save();
        } else {
            await rrModel.create({
                Guild: interaction.guild.id,
                Roles: newRole
            });
        }

        interaction.reply({ embeds: [
                new MessageEmbed()
                .setDescription(`${e.regular.yes} | Successfully added \`${role.name}\``)
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            ],
            ephemeral: true
        });
    }
}