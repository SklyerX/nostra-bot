const { MessageEmbed, CommandInteraction } = require("discord.js");
const DB = require("../../../Strutcture/models/ticket");

module.exports = {
    name: "ticket",
    description: "setup you're ticket message!",
    clientPerms: ["MANAGE_CHANNELS"],
    userPerms: ["MANAGE_CHANNELS"],
    type: 'CHAT_INPUT',
    options: [
        {
            name: "action",
            type: "STRING",
            description: "Add or Remove a member from this ticket.",
            required: true,
            choices: [
                { name: "Add", value: "add" },
                { name: "Remove", value: "remove" },
            ],
        },
        {
            name: "member",
            description: "Select a member",
            type: "USER",
            required: true,
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async async(interaction, client) {
        const { guildId, options, channel } = interaction;

        const Action = options.getString("action");
        const Member = options.getMember("member");

        const Embed = new MessageEmbed();

        switch(Action) {
            case "add":
                DB.findOne({ GuildId: guildId, ChannelID: channel.id }, async(err, data) => {
                    if(err) throw err;
                    if(!data) return interaction.reply({ embeds: [Embed.setColor("RED").setDescription("⛔ | This channel is not connect to a ticket ")], ephemeral: true });

                    if(data.MembersID.includes(Member.id)) return interaction.reply({ embeds: [Embed.setColor("RED").setDescription("⛔ | This member is already added to this ticket! ")], ephemeral: true });

                    data.MembersID.push(Member.id);

                    channel.permissionOverwrites.edit(Member.id, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true
                    });

                    interaction.reply({ embeds: [Embed.setColor("BLUE").setDescription(`✅ | ${Member} has been added to this ticket.`)]})

                    data.save();
                })
                break;
            case "remove":
                DB.findOne({ GuildId: guildId, ChannelID: channel.id }, async(err, data) => {
                    if(err) throw err;
                    if(!data) return interaction.reply({ embeds: [Embed.setColor("RED").setDescription("⛔ | This channel is not connect to a ticket ")], ephemeral: true });

                    if(!data.MembersID.includes(Member.id)) return interaction.reply({ embeds: [Embed.setColor("RED").setDescription("⛔ | This member is not added to this ticket! ")], ephemeral: true });

                    data.MembersID.remove(Member.id);

                    channel.permissionOverwrites.edit(Member.id, {
                        VIEW_CHANNEL: false,
                    });

                    interaction.reply({ embeds: [Embed.setColor("BLUE").setDescription(`✅ | ${Member} has been remove from this ticket.`)]})
                    data.save();
                })
                break;
        }
    }
}