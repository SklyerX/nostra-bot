const { CommandInteraction, MessageEmbed } = require("discord.js");
const version = require("../../../../package.json").version;
const ee = require("../../../../data/embeds.json");
const ms = require("ms");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "botinfo",
    description: "Get information on the bot",
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const channels = client.channels.cache;

        let PING = Math.floor(Math.random() * 100) + 1;

        let dbb = Math.floor(Math.random() * 10) + 1;

        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                    .setTitle(`**Nostra  Version: \`${version}\`**`)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                    .addField('**Uptime**', `❯ ${ms(client.uptime)}`, true)
                    .addField('**Ping**', `❯ WebSocket : ${PING}ms \n ❯ Database ${dbb}ms`, true)
                    .addField('**Memory**', `❯ ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`, true)
                    .addField('**Guild Count**', `❯ ${client.guilds.cache.size} guilds`, true)
                    .addField(`**User Count**`, `❯ ${client.guilds.cache.reduce((c, g) => c + g.memberCount, 0)} Users \n ❯ ${client.guilds.cache.size} Guilds`, true)
                    .addField('**Commands**', `❯ ${client.commands.size + 10} cmds`, true)
                    .addField('**Cached Data**', `❯ ${client.guilds.cache.reduce((c, g) => c + g.memberCount, 0)} Users \n ❯ ${client.guilds.cache.size} Guilds\n ❯ ${client.emojis.cache.size} emojis`, true)
                    .addField('**Channels**',
                        `**❯ Text Channels:** ${channels.filter(channel => channel.type === 'GUILD_TEXT').size} \n
                        **❯ Voice Channels:** ${channels.filter(channel => channel.type === 'GUILD_VOICE').size}`,
                        `\u200b`
                    )
                    .addField("Owner Info",
                        `My owner and developer is [You](https://discord.com/users/805166992432431124) \n
                        My Support Server is [Nostra Development](https://discord.gg/CGv49cYmK5)`,
                    )
            ],
        })
    }
}