const { MessageEmbed, CommandInteraction, MessageAttachment } = require('discord.js');
const level = require("discord-xp");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const canvacord = require("canvacord");
const levelSchema = require("../../../Strutcture/models/levelToggle");


module.exports = {
    name: "rank",
    description: "Check a users rank (level) in this server.",
    options: [
        {
            name: "member",
            description: "The member that you want to get level info on",
            required: true,
            type: "USER"
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const user = interaction.options.getUser("member");

        levelSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                new levelSchema({
                    Guild: interaction.guild.id,
                    Toggle: 0
                }).save();
                return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.no} | The leveling system and all of its components have been disabled by the server mod / admin \n\nTo turn on the level system please do \`/level-toggle value: ON\``)
                    ],
                    ephemeral: true
                })
            } else if (data.Toggle == 0) {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.no} | The leveling system and all of its components have been disabled by the server mod / admin \n\nTo turn on the level system please do \`/level-toggle value: ON\``)
                    ],
                    ephemeral: true
                })
            } else if (data.Toggle == 1) {
                const user1 = await level.fetch(user.id, interaction.guild.id);


                if (!user1) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.no} | No xp was found for this user.`)
                    ],
                    ephemeral: true
                });

                const neededXp = level.xpFor(parseInt(user1.level) + 1)
                // const img = ""

                const rank = new canvacord.Rank()
                    .setAvatar(user.displayAvatarURL({ dynamic: false, format: "png" }))
                    .setCurrentXP(user1.xp)
                    // .setBackground("IMAGE", )
                    .setRank(1, "RANK", false)
                    .setLevel(user1.level)
                    .setRequiredXP(neededXp)
                    .setProgressBar("#FFFFFF", "COLOR")
                    .setUsername(user.username)
                    .setDiscriminator(user.discriminator);

                rank.build()
                    .then(data => {
                        const attachment = new MessageAttachment(data, "RankCard.png");
                        interaction.reply({
                            files: [attachment]
                        });
                    });
            }
        })
    }
}