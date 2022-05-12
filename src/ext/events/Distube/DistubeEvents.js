const client = require("../../../index");
const { MessageEmbed } = require("discord.js");
const e = require("../../../../data/emojis.json");

const status = (queue) =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
    }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
    .on('playSong', (queue, song) =>
        queue.textChannel.send({
            embeds: [new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`🎶 | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user
                    }\n${status(queue)}`)]
        })
    )
    .on('addSong', (queue, song) =>
            queue.textChannel.send({ embeds: [new MessageEmbed().setColor("BLUE").setDescription(`🎼 | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)]})
    )
    .on('addList', (queue, playlist) =>
        queue.textChannel.send({ embeds: [new MessageEmbed().setColor("BLUE").setDescription(`${e.regular.invite} | Added \`${playlist.name}\` playlist (${playlist.songs.length
        } songs) to queue\n${status(queue)}`)]})
    )
    .on('error', (channel, err) => {
        channel.send({ embeds: [new MessageEmbed().setColor("RED").setDescription(`${e.regular.no} | An error encountered: ${err.toString().slice(0, 1974)}`)]})
        console.error(err)
    })
    .on('empty', queue => queue.textChannel.send({ embeds: [new MessageEmbed().setColor("RED").setDescription(e.regular.no + ' | Voice channel is empty! Leaving the channel...')]}))
    .on('searchNoResult', (message, query) =>
        message.channel.send({ embeds: [new MessageEmbed().setColor("RED").setDescription(`${e.regular.no} | No result found for \`${query}\`!`)]})
    )
    .on('finish', queue => queue.textChannel.send({ embeds: [new MessageEmbed().setDescription(`${e.regular.yes} | Queue finished.`).setColor("BLUE")]}))
// // DisTubeOptions.searchSongs = true
// .on("searchResult", (message, result) => {
//     let i = 0
//     message.channel.send(
//         `**Choose an option from below**\n${result
//             .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
//             .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`
//     )
// })
// .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`))
// .on("searchInvalidAnswer", message =>
//     message.channel.send(
//         `${client.emotes.error} | Invalid answer! You have to enter the number in the range of the results`
//     )
// )
// .on("searchDone", () => {})