const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const axios = require('axios');

module.exports = {
    ...new SlashCommandBuilder()
        .setName("meme")
        .setDescription("meme"),
    async execute(interaction) {

        const { title, url, permalink } = await getMeme();
        const embed = new MessageEmbed()
            .setColor('#2c93fb')
            .setTitle(title)
            .setURL(`https://www.reddit.com${permalink}`)
            .setImage(url)

        const rightArrow = new MessageButton()
            .setStyle('PRIMARY')
            .setLabel('>')
            .setCustomId('page_forward');

        const trash = new MessageButton()
            .setStyle('DANGER')
            .setLabel('🗑️')
            .setCustomId('end')

        const a = new MessageActionRow()
            .addComponents([rightArrow, trash]);
            
        interaction.reply({ embeds: [embed], components: [a,] })

        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter });
        collector.on('collect', async i => {

            if (i.customId == 'end') {
                i.message.delete();
            } else {
                const { title, url, permalink } = await getMeme();
                i.update({ embeds: [i.message.embeds[0].setTitle(title).setURL(`https://www.reddit.com${permalink}`).setImage(url)] })
            }

        })

        async function getMeme() {
            const req = await axios.get('https://www.reddit.com/r/memes/random/.json')
            return req.data[0].data.children[0].data
        }

    }

}