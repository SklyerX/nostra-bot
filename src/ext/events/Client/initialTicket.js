const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const Schema = require("../../../Strutcture/models/ticket");
const TicketSetupData = require("../../../Strutcture/models/TicketSetup");

module.exports = {
    name: "interactionCreate",
    async execute(interaction)  {
        /**
         * @param {ButtonInteraction} interactionCreate
         */
        if (!interaction.isButton()) return;
        const { guild, member, customId } = interaction;
        
        const Data = await TicketSetupData.findOne({ GuildID: guild.id });
        if (!Data) return;
        
        if (!Data.Buttons.includes(customId)) return;
        
        
        const ID = Math.floor(Math.random() * 90000) + 10000;
        
        await guild.channels.create(`${customId + "-" + ID}`, {
            type: "GUILD_TEXT",
            parent: Data.Category,
            permissionOverwrites: [
                {
                    id: member.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "ATTACH_FILES"]
                },
                {
                    id: Data.Everyone,
                    deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES"]
                }
            ]
        }).then(async (channel) => {
            await Schema.create({
                GuildID: guild.id,
                MembersID: member.id,
                TicketID: ID,
                ChannelID: channel.id,
                Closed: false,
                Locked: false,
                Type: customId,
                Claimed: false,
            });
            const Embed = new MessageEmbed()
                .setAuthor({ name: `${guild.name} | Ticket: ${ID}`, iconURL: guild.iconURL({ dynamic: true }) })
                .setDescription("Please wait for an admin to get back to you. During this time feel free to explain you're issue in the best detail, feel free to add attachments such as screenshots")
                .setColor("BLUE")
                .setFooter({ text: "The buttons below are staff only \n\nPlease note that our API is currently experiencing problems and it returns a false error, please continue with your ticket." })
        
            const Buttons = new MessageActionRow();
        
            Buttons.addComponents(
                new MessageButton()
                    .setCustomId("close")
                    .setLabel("Save & Close Ticket")
                    .setStyle("PRIMARY")
                    .setEmoji("📇"),
        
                new MessageButton()
                    .setCustomId("lock")
                    .setLabel("Lock")
                    .setStyle("SECONDARY")
                    .setEmoji("🔒"),
        
                new MessageButton()
                    .setCustomId("unlock")
                    .setLabel("Unlock")
                    .setStyle("SUCCESS")
                    .setEmoji("🔓"),
        
                new MessageButton()
                    .setCustomId("claim")
                    .setLabel("Claim")
                    .setStyle("PRIMARY")
                    .setEmoji("🌐")
            );
        
            channel.send({ embeds: [Embed], components: [Buttons] });
            await channel.send({ content: `${member} here is you're ticket!` }).then((m) => {
                setTimeout(() => {
                    m.delete().catch(() => { });
                }, 1 * 5000)
            });
            interaction.reply({ content: `${member} your ticket has been created: ${channel}`, ephemeral: true });
        });
    }
}
