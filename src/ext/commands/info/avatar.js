const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "avatar",
    description: "Get a users avatar",
    options: [
        {
            name: "user",
            description: "The member that you want to get the pfp of",
            required: false,
            type: "USER"
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    execute(interaction, client) {
        let User = interaction.options.getUser("user");
        if(!User) User = interaction.user;

        const userPfpData = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL(`${User.displayAvatarURL({ dynamic: false, format: "png" })}`)
                    .setLabel(`Download Png`)
                    .setStyle('LINK')
            )
            .addComponents(
                new MessageButton()
                    .setURL(`${User.displayAvatarURL({ dynamic: true, format: "gif" })}`)
                    .setLabel(`Download Gif`)
                    .setStyle('LINK')
            )

        const Embed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setDescription(`Here is <@${User.id}>'s Avatar \nPlease note that if the avatar is not a gif the url below for the **Download Gif** will be automatically ignored by you're browser.`)
            .setImage(User.displayAvatarURL({ dynamic: true }));

        interaction.reply({ embeds: [Embed], components: [userPfpData] })
    }
}