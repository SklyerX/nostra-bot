const { MessageEmbed, CommandInteraction } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const DB = require("../../../Strutcture/models/AfkSystem");

module.exports = {
    name: "afk",
    description: "let others know you're afk in the server to avoid getting pinged",
    options: [
        {
            name: "set",
            type: "SUB_COMMAND",
            description: "Set you're afk status in this server",
            options: [
                {
                    name: "status",
                    description: "set you're status so others know why you're afk",
                    type: "STRING",
                    required: true
                }
            ]
        },
        {
            name: "return",
            type: "SUB_COMMAND",
            description: "Remove you're afk status",
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild, options, user, createdTimestamp } = interaction;

        const Embed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) });

        const afkStatus = options.getString("status");

        try {

            switch(options.getSubcommand()) {
                case "set": {
                    await DB.findOneAndUpdate(
                        { GuildID: guild.id, UserID: user.id },
                        { Status: afkStatus, Time: parseInt(createdTimestamp / 1000)},
                        { new : true, upsert: true }
                    )
                    interaction.member.setNickname("[Afk] " + interaction.user.username)
                    Embed.setDescription(`${e.regular.yes} You're AFK status has been updated to: ${afkStatus}`);

                    return interaction.reply({ embeds: [Embed], ephemeral: true });
                }
                case "return": {
                    await DB.deleteOne({ GuildID: guild.id, UserID: user.id });

                    Embed.setDescription(`${e.regular.no} You're afk status has been removed.`);
                    return interaction.reply({ embeds: [Embed], ephemeral: true });
                }
            }

        } catch (err) {
            console.log(err);
        }
    }
}