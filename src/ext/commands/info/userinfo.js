const { MessageEmbed, CommandInteraction, Client } = require("discord.js");
const ee = require("../../../../data/embeds.json");
let outdent = require('outdent');

module.exports = {
    name: 'userinfo',
    description: "Get information about a user",
    options: [
        {
            name: "user",
            description: "User to get information from",
            type:"USER",
            required: true,
        }, {
            name: "ephemeral",
            description: "The output can only be viewed by yourself or not",
            type: "BOOLEAN",
            required: false
        }
    ],
    /**
     * 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        let args = interaction.options.data;
        let user = args[0].user;
        let ephemeral = args[1]?.value;
        let avatar = {
            png: user.displayAvatarURL({ format: 'png' }),
            jpeg: user.displayAvatarURL({format: 'jpeg'}),
            jpg: user.displayAvatarURL({ format: 'jpg' }),
            gif: user.displayAvatarURL({ format: 'gif' }),
            webp: user.displayAvatarURL({ format: 'webp' }),
            dynamic: user.displayAvatarURL({ format: 'png', dynamic: true })
        }
        let av = `[png](${avatar.png}) | [jpeg](${avatar.jpeg}) | [jpg](${avatar.jpg}) | [gif](${avatar.gif}) | [webp](${avatar.webp})`;
        let date = new Date(user.createdTimestamp);
        let member = interaction.guild.members.cache.get(user.id);
        let joinedDate = new Date(interaction.guild.members.cache.get(user.id).joinedTimestamp);
        let owner = (await interaction.guild.fetchOwner({
            cache: true
        })).user;
        let embed = new MessageEmbed()
            .setTitle(`${user.tag}`)
            .addField(`__Basic__`, outdent`
            **ID**: ${user.id}
            **Avatar**: ${av}
            **Discriminator**: ${user.discriminator}
            **Is Bot**: ${user.bot ? "Yes" : "No"}
            **Created**: \`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\`
            `)
            .addField(`__Member__`, outdent`
            **Joined At**: \`${joinedDate.getDate()}/${joinedDate.getMonth()}/${joinedDate.getFullYear()} ${joinedDate.getHours()}:${joinedDate.getMinutes()}:${joinedDate.getSeconds()}\`
            **Is Owner**: ${user.id == owner.id ? "Yes" : "No"}
            **Roles**: ${member.roles.cache.filter(s => s.id !== interaction.guild.id).map(role => role).join(", ")}
            `)
            .setThumbnail(avatar.dynamic)
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

        let obj = {embeds:[embed]};
        if(ephemeral) obj['ephemeral'] = ephemeral;
        return await interaction.reply(obj);
    }
}