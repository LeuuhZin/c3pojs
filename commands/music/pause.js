
module.exports.run = async(bot, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);
    if(!fetched) return message.channel.send('Atualmente não estou tocando nenhuma música.');
    
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(`<@${message.author.id} **você não está em nenhum canal de voz.**>`);

    if (fetched.dispatcher.paused) return message.channel.send(`<@${message.author.id}>** a música já está pausada**`);

    fetched.dispatcher.pause();

    message.channel.send(`Música pausada ${fetched.queue[0].songTitle}`);

}

module.exports.config = {
    command: 'pause'
}