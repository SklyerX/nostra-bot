const { MessageAttachment, CommandInteraction, MessageEmbed } = require('discord.js');
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const fetch = require('node-fetch');

module.exports = {
    name: 'clyde',
    description: 'Shows your text as Clyde\'s message',
    options: [
        {
            name: "message",
            description: "The message you want to clyde to say",
            required: true,
            type: "STRING",
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {

        const text = interaction.options.getString("message");        

        const url = `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`;

        let response;
        try {
            response = await fetch(url).then(res => res.json());
        }
        catch (err) {
            return interaction.reply({ embeds: [
                new MessageEmbed()
                .setDescription(`${e.regular.no} | An error occurred during this session, please try again`)
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            ],
        ephemeral: true
    })
        }
        const attachment = new MessageAttachment(response.message, 'clyde.png');
        return interaction.reply({ files: [attachment], ephemeral: true });

    }
}