const { CommandInteraction, MessageEmbed } = require("discord.js");
const Schema = require("../../../Strutcture/models/set-logs");
const ee = require("../../../../data/embeds.json");

module.exports = {
    name: "clear",
    description: "Clear the channels messages or a users messages from a channel!",
    clientPerms: ["MANAGE_MESSAGES"],
    userPerms: ["MANAGE_MESSAGES"],
    options: [
        {
            name: "amount",
            description: "Select the amount of messages to delete from a channel or a member.",
            type: "NUMBER",
            required: true
        },
        {
            name: "member",
            description: "Select a target to clear their messages.",
            type: "USER",
            required: false
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { channel, options } = interaction;

        const Amount = options.getNumber("amount");
        const Target = options.getMember("member");

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

        if (Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if (m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                };
            });

            await channel.bulkDelete(filtered, true).then(async (messages) => {
                Response.setDescription(`🧹 | Sucessfully deleted \`${messages.size}\` message(s) from ${Target}.`);

                await interaction.reply({ embeds: [Response], ephemeral: true });

                
                const data = await Schema.findOne({ Guild: interaction.guild.id });
                if (data) {
                    const channel = interaction.guild.channels.cache.get(data.Channel)

                    channel.send({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`**Member:** ${Target} \n**Channel:** <#${interaction.channel.id}> \n**Amount:** ${Amount} \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`).setTitle("Messages Cleared From Member")] })
                }

            })
        } else {
            await channel.bulkDelete(Amount, true).then(async (messages) => {
                Response.setDescription(`🧹 | Sucessfully deleted \`${messages.size}\` message(s) from <#${interaction.channel.id}>.`);

                await interaction.reply({ embeds: [Response], ephemeral: true });

                
                const data = await Schema.findOne({ Guild: interaction.guild.id });
                if (data) {
                    const channel = interaction.guild.channels.cache.get(data.Channel)

                    channel.send({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`**Channel:** <#${interaction.channel.id}> \n**Amount:** ${Amount} \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`).setTitle("Messages Cleared")] })
                }
            })
        }
    },
};