module.exports.run = async (bot, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);

    if (!fetched) return message.channel.send(`<@${message.author.id}> **atualmente não estou em nenhum canal de voz!**`);

    let queue = fetched.queue;
    let nowPlaying = queue[0];        
    let resp = `<:deezer:486254522486882304> **Tocando agora** ${nowPlaying.songTitle}\n\n`

    for (var i = 1; i < queue.length; i++) {
        resp += `\`${i}.\` ${queue[i].songTitle}\n`;
    }

    message.channel.send(resp);
}

module.exports.config = {
    command: 'playlist'
}