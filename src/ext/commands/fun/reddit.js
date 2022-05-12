const { MessageEmbed, CommandInteraction } = require("discord.js");
const fetch = require("node-fetch");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "reddit",
    description: "The info on a subreddit",
    options: [
        {
            name: "name",
            description: "The name of the subreddit you want to get info on",
            required: true,
            type: "STRING",
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const input = interaction.options.getString("name");
        const response = await fetch(`https://api.popcat.xyz/subreddit/${encodeURIComponent(input)}`)
        const rsp = await response.json()
        if (rsp.error) return interaction.reply({
            embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                .setDescription(`${e.regular.no} | The subreddit stated was not found.`)
            ]
        })
        const yesno = {
            true: "Yes",
            false: "No"
        }
        const embed = new MessageEmbed()
            .setTitle("Subreddit Info")
            .setThumbnail(rsp.icon.split("?")[0])//to avoid discord not showing img as it has to end with .png or .extension
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .addField("Name", rsp.name, true)
            .addField("Title", rsp.title, true)
            .addField("URL", `[URL](${rsp.url})`, true)
            .addField("Active Users", rsp.active_users, true)
            .addField("Total Users", rsp.members, true)
            .addField("Images Allowed", yesno[rsp.allow_images], true)
            .addField("Videos Allowed", yesno[rsp.allow_videos], true)
            .addField("Over 18", yesno[rsp.over_18], true)
            .addField("Description", rsp.description ? rsp.description : "None");

        interaction.reply({ embeds: [embed] });
    }
}