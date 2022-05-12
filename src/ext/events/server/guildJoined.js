const { Client, MessageEmbed } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const config = require("../../../../data/config.json").channels;
const uuid = require("uuid");
const DB = require("../../../Strutcture/models/getServerBack");
const chalk = require("chalk");
const settings = require("../../../../data/config.json");

module.exports = {
    name: "guildCreate",
    once: false,
    /**
     * 
     * @param {Client} client 
     */
    async execute(guild, client) {
        const Embed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setDescription(`${e.regular.joined} **A New Guild Has Been Submitted**`)
            .setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true} )})

        client.channels.cache.get(config.joined).send({ embeds: [Embed] });

        const encryptedData = uuid.v4();

        // try {
        //     const fetchedLogs = await guild.fetchAuditLogs({
        //         limit: 1,
        //         type: 'BOT_ADD',
        //     });
        //     let member = guild.members.cache.get(fetchedLogs.entries.first().executor.id);

        //     const embed = new MessageEmbed()
        //     .setAuthor({ name: `Thanks for adding me to ${guild.name}` })
        //     // .setDescription(`In case you lose access to you're server send the key below to the bot and get ownership back. \n**Note:** Do not share this key with anyone. Make sure to set the bots role as the highest role in the server. Don't give it a high role move its personal role higher.`)
        //     .setColor("#369193")
        //     // .addField("Key", `||${encryptedData}|| \nSend this key to any channel channel in ${guild.name} and get you're owner back, don't worry after posting the key the key will get deleted and no-one can use it again.`)
        //     .addField("Getting Started", `Use the help command \`/help\` to know more about me. Visit my [website](${settings.external.website}) for more information`)
        //     .addField("Support", `Join the [support server](${settings.external.discord}) if you need help with anything, the support team is here to answer all your questions!`)

        //     member.send({ embeds: [embed] });
            
        //     // DB.findOne({ Guild: guild.id }, async(err, data) => {
        //     //     if(err) throw err;
        //     //     if(!data) {
        //     //         new DB({
        //     //             Guild: guild.id,
        //     //             Key: encryptedData
        //     //         }).save();
        //     //         console.log(`[${chalk.green("+")}] New Guild Data Saved`)
        //     //     } else {
        //     //         data.delete();
        //     //         new DB({
        //     //             Guild: guild.id,
        //     //             Key: encryptedData
        //     //         }).save();
        //     //         console.log(`[${chalk.green("+")}] New Key Sent To ${guild.id}`)
        //     //     }
        //     // });
        // } catch (err) {
        //     throw err;
        // }
    }
};