module.exports.run = async(bot, message, args) => {

    if (!message.member.voiceChannel) return message.channel.send({
        embed: {
            author: {
                name: message.author.username,
                icon_url: message.author.avatarURL
            },
            description: `Você precisa entrar em um canal de voz!`,
            color: 14614842
        }
    })

    if (!message.guild.me.voiceChannel) return message.channel.send({
        embed: {
            author: {
                name: message.author.username,
                icon_url: message.author.avatarURL
            },
            description: `Opa opa, não estou conectado em nenhum canal de voz!`,
            color: 14614842
        }
    })

    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send({
        embed: {
            author: {
                name: message.author.username,
                icon_url: message.author.avatarURL
            },
            description: `Desculpe, você não está conectado no mesmo canal de voz.`,
            color: 14614842
        }
    })

    message.guild.me.voiceChannel.leave();

    //message.reply("I'll be back someday.");
}

module.exports.config = {
    command: 'stop'
}