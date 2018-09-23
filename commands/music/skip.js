
module.exports.run = async(bot, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);
    if(!fetched) return message.channel.send('Atualmente não estou tocando nenhuma música.');
    
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(`<@${message.author.id} **você não está em nenhum canal de voz.**>`);

    let userCount = message.member.voiceChannel.members.size;
    let required = Math.ceil(userCount/2);

    if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

    if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`<@${message.member.id}> **você já votou!** ${fetched.queue[0].voteSkips.length}/${required} requeridos`);

    fetched.queue[0].voteSkips.push(message.member.id);

    ops.active.set(message.guild.id, fetched);

    if(fetched.queue[0].voteSkips.length >= required) {
        message.channel.send('**Sucesso** próxima música!');
        return fetched.dispatcher.emit('end');
    }

    message.channel.send(`**Sucesso** voto enviado! ${fetched.queue[0].voteSkips.length}/${required} requeridos`);
}

module.exports.config = {
    command: 'skip'
}