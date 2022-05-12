const { MessageEmbed, CommandInteraction } = require('discord.js');
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const r = require("link-checker-malicious");

module.exports = {
    name: 'screenshot',
    description: 'Take a screenshot of a website',
    options: [
        {
            name: "url",
            description: "The link of the website you want to screenshot",
            required: true,
            type: "STRING",
        }
    ],
    /** 
     * @param {CommandInteraction} interaction
    */
    async execute(interaction) {
        const url = interaction.options.getString("url");
        const emb = new MessageEmbed()
            .setColor('BLUE')
            .setTitle(`Screenshot`)
            .setImage(`https://image.thum.io/get/png/width/1920/crop/720/noanimate/${url}`)
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

        if (!url.startsWith('http')) {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${e.regular.no} | Profide a valid url`)
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                ],
                ephemeral: true
            })
        }
        else if (r.is_cam(url) === 'true') {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${e.regular.no} | cam links are not allowed.`)
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                ],
                ephemeral: true
            })
        }
        else if (r.is_dating(url) === 'true') {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${e.regular.no} | dating links are not allowed.`)
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                ],
                ephemeral: true
            })
        }
        else if (r.is_gambling(url) === 'true') {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${e.regular.no} | gambling links are not allowed.`)
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                ],
                ephemeral: true
            })
        }
        else if (r.is_pirated(url) === 'true') {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${e.regular.no} | pirated links are not allowed.`)
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                ],
                ephemeral: true
            })
        }
        else if (r.is_ip_grabber(url) === 'true') {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${e.regular.no} | ip grabber links are not allowed.`)
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                ],
                ephemeral: true
            })
        }
        else if (r.is_nsfw(url) === 'true') {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${e.regular.no} | NSFW links are not allowed.`)
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                ],
                ephemeral: true
            })
        }
        else if (r.is_scam(url) === 'true') {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${e.regular.no} | scam links are not allowed.`)
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                ],
                ephemeral: true
            })
        }
        else if (r.is_unk(url) === 'true') {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${e.regular.no} | uncatogorized links are not allowed.`)
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                ],
                ephemeral: true
            })
        }
        else {
            interaction.reply({ embeds: [emb] });
        }
    }
}