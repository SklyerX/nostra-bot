const { MessageEmbed, CommandInteraction } = require("discord.js");
const { get } = require("request-promise-native");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "pokemon",
    description: "Get infomation on a pokemon",
    options: [
        {
            name: "pokemon",
            description: "The pokemon you want to get infomation.",
            required: true,
            type: "STRING"
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const args = interaction.options.getString("pokemon");

        try {
            const color = "BLUE";

            const pokemon = args.toLowerCase();

            const option = {
                url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
                method: "GET",
                headers: {
                    "Content-type": "application/vnd.api+json",
                    Accept: "application/vnd.api+json",
                },
                json: true,
            };

            const res = await get(option).catch(() => {
                return interaction.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`${e.regular.no} | No results were found.`)
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                    ],
                    ephemeral: true
                })
            });

            if (!res) return interaction.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`${e.regular.no} | No results were found.`)
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                    ],
                    ephemeral: true
                })


            const { sprites, stats, weight, height, name, types } = res;
            let typesArray = [];
            types.forEach((type) => typesArray.push(`${type.type.name}`));

            const pokemonSearch = {
                title: `${name.charAt(0).toUpperCase(name.charAt(0)) +
                    (name.length > 0 ? name.slice(1).toLowerCase() : "")
                    }`,
                fields: [
                    {
                        name: "⚖ Weight",
                        value: `${weight ? weight : "N/A"}`,
                        inline: true,
                    },
                    {
                        name: "📐 Height",
                        value: `${height ? height : "N/A"}`,
                        inline: true,
                    },
                ],
                thumbnail: {
                    url: sprites.front_default ? `${sprites.front_default}` : null,
                },
                color: color,
            };
            let typesField = {
                name: "🗂 Types",
                inline: false,
            };

            if (typesArray.length > 0) {
                if (typesArray.length > 1) {
                    typesField.value = `${typesArray[0].charAt(0).toUpperCase() +
                        typesArray[0].slice(1).toLowerCase() +
                        ", " +
                        typesArray.slice(1).join(", ")
                        }`;
                } else {
                    typesField.value = `${typesArray[0].charAt(0).toUpperCase() +
                        typesArray[0].slice(1).toLowerCase()
                        }`;
                }
                pokemonSearch.fields.push(typesField);
            }

            stats.forEach((stat) =>
                pokemonSearch.fields.push({
                    name: `${stat.stat.name.charAt(0).toUpperCase() +
                        stat.stat.name.slice(1).toLowerCase()
                        }`,
                    value: `${stat.base_stat ? stat.base_stat : "N/A"}`,
                    inline: true,
                })
            );

            return await interaction.reply({
                embeds: [pokemonSearch],
                ephemeral: true
            });
        } catch (err) {
            console.log(err);
        }
    },
};