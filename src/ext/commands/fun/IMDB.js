const { MessageEmbed, CommandInteraction } = require("discord.js")
const fetch = require("node-fetch");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "imdb",
    description: "Get information on a movie",
    options: [
        {
            name: "name",
            description: "The name of the movie you want to get info on",
            required: true,
            type: "STRING"
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
            const query = interaction.options.getString("name");
            const result = await fetch(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(query)}`).then(res => res.json());
            if(result.error) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setDescription(`${e.regular.no} | No results were found for this input!`)
                ]
            });
            const embed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                .setThumbnail(result.poster)
                .setURL(result.imdburl)
                .setTitle(result.title)
                .addField("Ratings", result.ratings[0].value, true)
                .addField("Votes", result.votes, true)
                .addField("Country", result.country, true)
                .addField("Languages", result.languages, true)
                .addField("Box Office", result.boxoffice, true)
                .addField("Director", result.director, true)
                .addField("Run Time", result.runtime, true)
                .addField("Type", result.type, true)
                .addField("Released", new Date(result.released).toDateString(), true)
                .setDescription(result.plot.slice(0, 4093) + "..")

            interaction.reply({ embeds: [embed] })
    }
}
