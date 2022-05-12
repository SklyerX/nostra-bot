const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const Schema = require("../../../../data/Verification");

module.exports = {
    name: "verification",
    description: "Setup the servers verification",
    options: [
        {
            name: "channel",
            description: "The channel that you want to set the backup panel in",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"]
        },
        {
            name: "role",
            description: "The role that you want to give members when they are verified",
            required: true,
            type: "ROLE"
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { options, guild } = interaction;

        const channelPanel = options.getChannel("channel");
        const verifiedRole = options.getRole("role");

        Schema.findOne({ Guild: guild.id }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                new Schema({
                    Guild: guild.id,
                    Channel: channelPanel.id,
                    Role: verifiedRole.id
                }).save();
                return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`${e.regular.yes} | Successfully set ${channelPanel} as the verification panel channel.`)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setColor(ee.color)
                    ],
                    ephemeral: true
                })
            } else {
                data.delete();
                new Schema({
                    Guild: guild.id,
                    Channel: channelPanel.id,
                    Role: verifiedRole.id
                }).save();
                return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`${e.regular.yes} | Updated panel channel to ${channelPanel}.`)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setColor(ee.color)
                    ],
                    ephemeral: true
                })
            }
        });

        const chPanel = interaction.guild.channels.cache.get(channelPanel.id);

        chPanel.send({
            embeds: [
                new MessageEmbed()
                    .setDescription(`${e.regular.loading} | Please click the button below to get verified and to get access to the rest of the server.`)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                    .setColor(ee.color)
            ]
        }).then((message) => {

            const emojiToReact = "✅"

            message.react(emojiToReact);
            
            client.on("messageReactionAdd", async(reaction, user) => {
                if(reaction.message.partial) await reaction.message.fetch();
                if(reaction.partial) await reaction.fetch();
                if(user.bot) return;
                if(!reaction.message.guild) return;
    
                if(reaction.message.channel.id == chPanel) {
                    if(reaction.emoji.name === emojiToReact) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add(verifiedRole)
                    }
                }
            });

            client.on("messageReactionRemove", async(reaction, user) => {
                if(reaction.message.partial) await reaction.message.fetch();
                if(reaction.partial) await reaction.fetch();
                if(user.bot) return;
                if(!reaction.message.guild) return;
    
                if(reaction.message.channel.id == chPanel) {
                    if(reaction.emoji.name === emojiToReact) {
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(verifiedRole)
                    }
                }
            })
        })

    }
}