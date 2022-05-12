const { CommandInteraction, MessageEmbed } = require("discord.js");
const { get } = require("request-promise-native");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "anime",
    description: "get information on an anime",
    options: [
        {
            name: "name",
            description: "The anime you want to get info on",
            required: true,
            type: "STRING",
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        try {
            const color = "BLUE";
            const query = interaction.options.getString("name");

            let option = {
                url: `https://kitsu.io/api/edge/anime?filter[text]-${query}`,
                method: "GET",
                headers: {
                    "Content-type": "application/vnd.api+json",
                    Accept: "application/vnd.api+json",
                },
                json: true,
            };

            const res = await get(option).catch(() => {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.no} | No results were found for this input!`)
                    ]
                });
            });

            if (!res)
                return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.no} | No results were found for this input!`)
                    ]
                });

            const anime = res?.data[0];
            if (!anime)
                return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.no} | No results were found for this input!`)
                    ]
                });

            const animeSearch = {
                title: `${anime.attributes.titles.en_jp}`,
                url: `${anime.links.self}`,
                thumbnail: {
                    url: anime.attributes.posterImage.original,
                },
                description: anime.attributes.synopsis,
                fields: [
                    {
                        name: "⏳ Status",
                        value: anime.attributes.status,
                        inline: true,
                    },
                    {
                        name: "🗂 Type",
                        value: anime.attributes.showType,
                        inline: true,
                    },
                    {
                        name: "🗓️ Aired",
                        value:
                            anime.attributes.startDate && anime.attributes.endDate
                                ? anime.attributes.startDate == anime.attributes.endDate
                                    ? `**${anime.attributes.startDate}**`
                                    : `From **${anime.attributes.startDate
                                        ? anime.attributes.startDate
                                        : "N/A"
                                    }** to **${anime.attributes.endDate
                                        ? anime.attributes.endDate
                                        : "N/A"
                                    }**`
                                : `From **${anime.attributes.startDate
                                    ? anime.attributes.startDate
                                    : "N/A"
                                }** to **${anime.attributes.endDate ? anime.attributes.endDate : "N/A"
                                }**`,
                        inline: false,
                    },
                    {
                        name: "💽 Total Episodes",
                        value: `${anime.attributes.episodeCount
                                ? anime.attributes.episodeCount
                                : "N/A"
                            }`,
                        inline: true,
                    },
                    {
                        name: "⏱ Duration",
                        value: `${anime.attributes.episodeLength
                                ? anime.attributes.episodeLength
                                : "N/A"
                            } Min`,
                        inline: true,
                    },
                    {
                        name: "⭐ Average Rating",
                        value: `${anime.attributes.averageRating
                                ? anime.attributes.averageRating
                                : "N/A"
                            }`,
                        inline: true,
                    },
                    {
                        name: "🏆 Rank",
                        value: `${anime.attributes.ratingRank
                                ? "**TOP " + anime.attributes.ratingRank + "**"
                                : "N/A"
                            }`,
                        inline: true,
                    },
                ],
                color: color,
            };

            return interaction.reply({
                embeds: [animeSearch],
            });
        } catch (err) {
            console.log(err);
        }
    },
};
