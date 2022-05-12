const { ButtonInteraction, MessageEmbed } = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");
const Schema = require("../../../Strutcture/models/ticket");
const TicketSetupData = require("../../../Strutcture/models/TicketSetup");

/**
 * @param {ButtonInteraction} interaction
 */
module.exports = {
    name: "interactionCreate",
    async execute(interaction) {

        if (!interaction.isButton()) return;
    
        const { guild, customId, channel, member } = interaction;
    
        const TicketSetup = await TicketSetupData.findOne({ GuildID: guild.id });
        if(!TicketSetup) return interaction.reply({ content: "The data for this system is outdated." });
    
        if (!member.roles.cache.find((r) => r.id === TicketSetup.Handlers)) return interaction.reply({
            content: "You cannot use this buttons as you do not have the administrator permissions",
            ephemeral: true
        })
    
        if (!["close", "lock", "unlock", "claim"].includes(customId)) return;
    
        const Embed = new MessageEmbed()
            .setColor("BLUE");
    
        Schema.findOne({ ChannelID: channel.id }, async (err, data) => {
            if (err) throw err;
            if (!data) return;
            switch (customId) {
                case "lock":
                    if (data.Locked == true)
                        return interaction.reply({
                            content: "This ticket is already locked!",
                            ephemeral: true
                        });
                    await Schema.updateOne({ ChannelID: channel.id }, { Locked: true });
                    Embed.setDescription("🔒 | This ticket is now locked");
    
                    data.MembersID.forEach((m) => {
                        channel.permissionOverwrites.edit(m, {
                            SEND_MESSAGES: false
                        });
                    })
    
                    interaction.reply({ embeds: [Embed] });
                    break;
    
                case "unlock":
                    if (data.Locked == false)
                        return interaction.reply({
                            content: "This ticket is already unlocked!",
                            ephemeral: true
                        });
                    await Schema.updateOne({ ChannelID: channel.id }, { Locked: false });
                    Embed.setDescription("🔓 | This ticket is now unlocked");
    
                    data.MembersID.forEach((m) => {
                        channel.permissionOverwrites.edit(m, {
                            SEND_MESSAGES: true
                        });
                    })
    
                    interaction.reply({ embeds: [Embed] });
                    break;
    
                case "close":
                    if(data.Closed == true)
                        return interaction.reply({
                            content: "Ticket is already closed please wait while this ticket is getting deleted!",
                            ephemeral: true
                        });
                    const attachment = await createTranscript(channel, {
                        limit: -1,
                        returnBuffer: false,
                        fileName: `${data.Type} - ${data.TicketID}.html`
                    });
                    await Schema.updateOne({ ChannelID: channel.id }, { Closed: true });
                    
                    const Message = await guild.channels.cache.get(TicketSetup.Transcripts).send({
                        embeds: [Embed.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(`Transcript Type: ${data.Type} \nId: ${data.TicketID}`) ],
                        files: [attachment]
                    });
    
                    interaction.reply({
                        embeds: [Embed.setDescription(`The transcript is now saved. [Transcript](${Message.url})`).setFooter({ text: "This channel will be deleted in 10 sec"})]
                    });
    
                    setTimeout(() => {
                        channel.delete()
                    }, 10 * 1000)
                    break;
                case "claim":
                    if(data.Claimed == true) return interaction.reply({ content: `This is already claimed by <@${data.ClaimedBy}>`, empheral: true });
    
                        await Schema.updateOne({ ChannelID: channel.id }, { Claimed: true, ClaimedBy: member.id })
                    
                        Embed.setDescription(`🌐 | This ticket is now claimed by ${member}`)
                        interaction.reply({ embeds: [Embed] });
                    break;
            }
        })
    }
}

// Backup

// const { ButtonInteraction, MessageEmbed } = require("discord.js");
// const { createTranscript } = require("discord-html-transcripts");
// const { transcriptId } = require("../config.json").ticketData;
// const Schema = require("../models/ticket");
// const client = require("../index");

// /**
//  * @param {ButtonInteraction} interaction
//  */

// client.on("interactionCreate", async (interaction) => {
//     if (!interaction.isButton()) return;

//     const { guild, customId, channel, member } = interaction;

//     if (!member.permissions.has("ADMINISTRATOR")) return interaction.deferReply({
//         content: "You cannot use this buttons as you do not have the administrator permissions",
//         ephemeral: true
//     })

//     if (!["close", "lock", "unlock"].includes(customId)) return;

//     const Embed = new MessageEmbed()
//         .setColor("BLUE");

//     Schema.findOne({ ChannelID: channel.id }, async (err, data) => {
//         if (err) throw err;
//         if (!data) return;
//         switch (customId) {
//             case "lock":
//                 if (data.Locked == true)
//                     return interaction.deferReply({
//                         content: "This ticket is already locked!",
//                         ephemeral: true
//                     });
//                 await Schema.updateOne({ ChannelID: channel.id }, { Locked: true });
//                 Embed.setDescription("🔒 | This ticket is now locked");
//                 channel.permissionOverwrites.edit(data.MemberID, {
//                     SEND_MESSAGES: false
//                 });
//                 interaction.deferReply({ embeds: [Embed] });
//                 break;

//             case "unlock":
//                 if (data.Locked == false)
//                     return interaction.deferReply({
//                         content: "This ticket is already unlocked!",
//                         ephemeral: true
//                     });
//                 await Schema.updateOne({ ChannelID: channel.id }, { Locked: false });
//                 Embed.setDescription("🔓 | This ticket is now unlocked");
//                 channel.permissionOverwrites.edit(data.MemberID, {
//                     SEND_MESSAGES: true
//                 });
//                 interaction.deferReply({ embeds: [Embed] });
//                 break;

//             case "close":
//                 if(data.Closed == true)
//                     return interaction.deferReply({
//                         content: "Ticket is already closed please wait while this ticket is getting deleted!",
//                         ephemeral: true
//                     });
//                 const attachment = await createTranscript(channel, {
//                     limit: -1,
//                     returnBuffer: false,
//                     fileName: `${data.Type} - ${data.TicketID}.html`
//                 });
//                 await Schema.updateOne({ ChannelID: channel.id }, { Closed: true });
                
//                 const MEMBER = guild.members.cache.get(data.MemberID);
//                 const Message = await guild.channels.cache.get(transcriptId).send({
//                     embeds: [Embed.setAuthor({ name: MEMBER.user.tag, iconURL: MEMBER.user.displayAvatarURL({ dynamic: true }) }).setTitle(`Transcript Type: ${data.Type} \nId: ${data.TicketID}`) ],
//                     files: [attachment]
//                 });

//                 interaction.deferReply({
//                     embeds: [Embed.setDescription(`The transcript is now saved. [Transcript](${Message.url})`)]
//                 });

//                 setTimeout(() => {
//                     channel.delete()
//                 }, 10 * 1000)
//         }
//     })
// })