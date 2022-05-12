const { MessageEmbed, CommandInteraction } = require('discord.js');
const moment = require('moment')

module.exports = {
    name: 'serverinfo',
    description: "Get information on the server.",
    /** 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const filterLevels = {
            DISABLED: 'Off',
            MEMBERS_WITHOUT_ROLES: 'No Role',
            ALL_MEMBERS: 'Everyone'
        };
        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: '(╯°□°）╯︵ ┻━┻',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        };
        const vanityCode = interaction.guild.vanityURLCode;
        let vanityInvite = `https://discord.gg/${vanityCode}`;
        if (vanityCode === null) vanityInvite = 'No custom URL';
        const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const embed = new MessageEmbed()
            .setTimestamp()
            .setTitle("**Server Information**")
            .setColor('RANDOM')
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .addField(`🎫 Name of server:`, `${interaction.guild.name}`, true)
            .addField(`🆔 ID of server`, `${interaction.guild.id}`, true)
            .addField(`👑 Owner`, `<@${interaction.guild.ownerId}>`, true)
            .addField(`👥 No. of Members`, `${interaction.guild.members.cache.size}`, true)
            .addField(`🤖 No. of Bots:`, `${interaction.guild.members.cache.filter(member => member.user.bot).size}`, true)
            .addField(`🚶 Weights:`, `${interaction.guild.members.cache.filter(member => !member.user.bot).size}`, true)
            .addField(`😗 Emojis:`, `${interaction.guild.emojis.cache.size}`, true)
            .addField(`👻 Animated Emoji\'s:`, `${interaction.guild.emojis.cache.filter(emoji => emoji.animated).size}`, true)
            .addField(`💬 Total Text Channels:`, `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size}`, true)
            .addField(`🎤 Total Voice Channels:`, `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size}`, true)
            .addField(`👔 Total Amount of Roles:`, `${interaction.guild.roles.cache.size}`, true)
            .addField(`📅 Created at`, `${moment(interaction.guild.createdTimestamp).format('LL')} ${moment(interaction.guild.createdTimestamp).format('LTS')} ${moment(interaction.guild.createdTimestamp).fromNow()},`)
            .addField(`🚀 Boost Tier`, `${interaction.guild.premiemTier ? `Tier ${interaction.guild.premiemTier}` : 'None'}`)
            .addField(`💨 Boost Count`, `${interaction.guild.premiemSubscriptionCount || '0'}`)
            .addField(`🔥 Explicit Filter`, `${filterLevels[interaction.guild.explicitContentFilter]}`)
            .addField(`✅ Verification Level`, `${verificationLevels[interaction.guild.verificationLevel]}`)
            .addField(`🔗 Vanity Link`, `${vanityInvite}`)
            // .addField('Presence', 
            //     `🟢 Online: ${members.filter(member => member.presence.status === 'online').size}`,
            //     `🌙 Idle: ${members.filter(member => member.presence.status === 'idle').size}`,
            //     `🔴 Do Not Disturb: ${members.filter(member => member.presence.status === 'dnd').size}`,
            //     `⚫ Offline: ${members.filter(member => member.presence.status === 'offline').size}`,
            //     '\u200b',
            //     '**Other Information**',
            //     `⚙️ Integrations: ${message.guild.fetchIntegrations().size ? message.guild.fetchIntegrations().size : 'No integrations'}`,
            //     `⚡ Webhooks: ${message.guild.fetchWebhooks().size || '0'}`,
            //     '\u200b'
            // , true)
            .addField(`Roles [${roles.length}]`, roles.length < 15 ? roles.join(', ') : roles.length > 15 ? `${roles.slice(0, 15).join(', ')}\n+${roles.length - 15} roles...` : 'None')
            .setAuthor({ name: `${interaction.guild.name}` })

        interaction.reply({ embeds: [embed] });
    }
}

// Clean mode

// const { MessageEmbed } = require('discord.js');
// const moment = require('moment');

// module.exports = {
//     name: "serverinfo",
//     aliases: [],
//     description: 'retrieves data about the server.',
//     run: async (client, message, args) => {

//         // Get guild from message
//         const { guild } = message;

//         // Owner Variables
//         const owner = await guild.fetchOwner();
//         const serverOwner = client.users.cache.get(owner.id);

//         // Categories Variables
//         const categories = await guild.channels.cache.filter((channel) => channel.type === "GUILD_CATEGORY").size;
//         const textChannels = await guild.channels.cache.filter((channel) => channel.type === "GUILD_TEXT").size;
//         const voiceChannels = await guild.channels.cache.filter((channel) => channel.type === "GUILD_VOICE").size;
//         const newsChannels = await guild.channels.cache.filter((channel) => channel.type === "GUILD_NEWS").size;
//         const stageChannels = await guild.channels.cache.filter((channel) => channel.type === "GUILD_STAGE_VOICE").size;
//         const totalChannels = categories + textChannels + voiceChannels + newsChannels + stageChannels;

//         // Members Variables
//         const totalMembers = await guild.memberCount;
//         const humanMembers = await guild.members.cache.filter((m) => !m.user.bot).size;
//         const botMembers = await guild.members.cache.filter((m) => m.user.bot).size;

//         // Emojis Variables
//         const totalEmojis = await guild.emojis.cache.size;
//         const normalEmojis = await guild.emojis.cache.filter((e) => !e.animated).size;
//         const animatedEmojis = await guild.emojis.cache.filter((e) => e.animated).size;

//         // Boost Variables
//         const boostLevel = await guild.premiumTier ? guild.premiumTier : "0";
//         const totalBoosts = await guild.premiumSubscriptionCount || "0";

//         // Create embed
//         const embed = new MessageEmbed()
//             .setTitle("Server Information")
//             .setColor(client.colors.purple)
//             .addFields(
//                 { name: `**Server Name:**`, value: `\`\`\`${guild.name}\`\`\``, inline: true },
//                 { name: `**Server Owner:**`, value: `\`\`\`${serverOwner.tag}\`\`\``, inline: true },
//                 { name: `**Server Members [ ${totalMembers} ]:**`, value: `\`\`\`Members: ${humanMembers} | Bots: ${botMembers}\`\`\``, inline: false },
//                 { name: `**Server ID:**`, value: `\`\`\`${guild.id}\`\`\``, inline: true },
//                 { name: `**Bot Prefix:**`, value: `\`\`\`${client.config.prefix}\`\`\``, inline: true },
//                 { name: `**Server Emojis [ ${totalEmojis} ]:**`, value: `\`\`\`Normal: ${normalEmojis} | Animated: ${animatedEmojis}\`\`\``, inline: false },
//                 { name: `**Server Categories and Channels [ ${totalChannels} ]:**`, value: `\`\`\`Categories: ${categories} | Text: ${textChannels} | Voice: ${voiceChannels} | Announcement: ${newsChannels} | Stage: ${stageChannels}\`\`\``, inline: false },
//                 { name: `**Server Boost Level:**`, value: `\`\`\`${boostLevel}\`\`\``.replace("NONE", "0"), inline: true },
//                 { name: `**Server Boosts Amount:**`, value: `\`\`\`${totalBoosts}\`\`\``, inline: true },
//                 { name: `**Creation Date:**`, value: `\`\`\`${moment(guild.createdTimestamp).format("LT")} ${moment(guild.createdTimestamp).format("LL")} (${moment(guild.createdTimestamp).fromNow()})\`\`\``, inline: false },
//             );

//         // Send embed
//         message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
//     },
// };