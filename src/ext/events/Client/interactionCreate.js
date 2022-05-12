const { Client, CommandInteraction, MessageEmbed, WebhookClient, Collection } = require("discord.js");
const Schema = require("../../../Strutcture/models/slashCommand");
const config = require("../../../../data/embeds.json");
const settings = require("../../../../data/config.json");
const ee = require("../../../../data/emojis.json").regular;
const ms = require("ms");

const hook = new WebhookClient({ id: settings.webhook.loggerId, token: settings.webhook.loggerToken });
const Timeout = new Collection();

module.exports = {
    name: "interactionCreate",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);

            // User Permission
            if (!interaction.member.permissions.has(command.userPerms || [])) return interaction.reply({ embeds: [new MessageEmbed().setTitle("Permissions Missing").setColor(config.color).setFooter({ text: config.footerText, iconURL: config.footerIcon }).setDescription(`${ee.no} | You require the \`${command.userPerms}\` to execute this command.`)] })
            // Client Permission
            if (!interaction.guild.me.permissions.has(command.clientPerms || [])) return interaction.reply({ embeds: [new MessageEmbed().setTitle("Permissions Missing").setColor(config.color).setFooter({ text: config.footerText, iconURL: config.footerIcon }).setDescription(`${ee.no} | I require the \`${command.clientPerms}\` to execute this command.`)] })

            if (command.dev === true && interaction.member.id !== `${settings.bot.ownerId}`) {
                await interaction.deferReply();
                return interaction.followUp({
                    embeds: [new MessageEmbed()
                        .setColor("#303236")
                        .setFooter({ text: "Nostra Development & The Observers Team", iconURL: "https://pbs.twimg.com/profile_images/1270772323696758784/ciHsYaSp_400x400.jpg" })
                        .setDescription(`${ee.no} | This command is set to developer only`)
                    ], ephemeral: true
                })
            }

            if (!command) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setDescription("⛔ An error was found while running this command")
                ], ephemeral: true
            }) && client.commands.delete(interaction.commandName);

            if(command) {
                Schema.findOne({ Guild: interaction.guild.id }, async(err, data) => {
                    if(err) throw err;
                    if(data) {
                        if(data.Cmds.includes(command.name)) return interaction.reply({
                            embeds:[
                                new MessageEmbed()
                                .setColor(config.color)
                                .setFooter({ text: config.footerText, iconURL: config.footerIcon })
                                .setDescription(`${ee.no} | This command has been disabled by the server mods / admin`)
                            ],
                            ephemeral: true
                        });
                        command.execute(interaction, client);
                    } else {
                        command.execute(interaction, client);
                    }
                });
            }


            hook.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle("Command Run Log")
                        .setColor("#2C2F33")
                        .addField("User Info", `<@${interaction.user.id}> (${interaction.user.id})`)
                        .addField("Server Info", `Member Count: ${interaction.guild.memberCount} \n\n Server Name: ${interaction.guild.name} (${interaction.guild.id}) \n\n Server Owner: <@${interaction.guild.ownerId}> (${interaction.guild.ownerId})`)
                        .addField("Commad Name", `${interaction.commandName}`)
                ]
            })
        }

        // Reaction Role Handling
        if (interaction.isSelectMenu()) {
            if (interaction.customId !== "reaction-roles") return;
            await interaction.deferReply({ ephemeral: true });

            const roleId = interaction.values[0];
            const role = interaction.guild.roles.cache.get(roleId);
            const memberRoles = interaction.member.roles;
            const hasRole = memberRoles.cache.has(roleId);

            if (hasRole) {
                memberRoles.remove(roleId);
                await interaction.followUp({
                    embeds: [
                        new MessageEmbed()
                            .setColor(config.color)
                            .setFooter({ text: config.footerText, iconURL: config.footerIcon })
                            .setDescription(`${ee.yes} | Successfully removed ${role.name} from you!`)
                    ]
                })
            } else {
                memberRoles.add(roleId);
                await interaction.followUp({
                    embeds: [
                        new MessageEmbed()
                            .setColor(config.color)
                            .setFooter({ text: config.footerText, iconURL: config.footerIcon })
                            .setDescription(`${ee.yes} | Successfully assigned ${role.name} to you!`)
                    ]
                })
            }
        }
    }
}