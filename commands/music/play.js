const yt = require('ytdl-core');
var fetchVideoInfo = require('youtube-info');
const Discord = require('discord.js');

module.exports.run = async (bot, message, args, ops) => {

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

    if (!args[0]) return message.channel.send({
        embed: {
            author: {
                name: message.author.username,
                icon_url: message.author.avatarURL
            },
            description: `Por favor insira uma URL ou o nome da música.`,
            color: 14614842
        }
    })

    let validate = await yt.validateURL(args[0]);


    if (!validate) {
        let commandFile = require('./pesquisar.js');
        return commandFile.run(bot, message, args, ops);
    }
    let info = await yt.getInfo(args[0]);

    var vInfo = fetchVideoInfo(info.video_id).then(async function (rInfo) {
        var formatMin = formatTime(rInfo.duration);

        let data = ops.active.get(message.guild.id) || {};

        if (!data.connection) data.connection = await message.member.voiceChannel.join();
        if (!data.queue) data.queue = [];
        data.guildID = message.guild.id;

        data.queue.push({
            songTitle: info.title,
            requester: message.author.tag,
            url: args[0],
            announce: message.channel.id,
            author: info.author.name,
            views: rInfo.views,
            duracao: formatMin,
            likes: rInfo.likeCount,
            deslikes: rInfo.dislikeCount
        });

        if (!data.dispatcher) play(bot, ops, data, rInfo, formatMin, info, message);
        else {
            message.channel.send({
                embed: {
                    description: `:headphones: Música adiciona a fila: ${info.title}`,
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: `Música adicionada por: ${message.author.username}`
                    },

                    color: 3066993,

                    timestamp: new Date()
                }
            })
        }

        ops.active.set(message.guild.id, data);

    });

}

module.exports.config = {
    command: "play"
}

function formatTime(nbSeconds, hasHours) {
    var time = [],
        s = 1;
    var calc = nbSeconds;

    if (hasHours) {
        s = 3600;
        calc = calc / s;
        time.push(format(Math.floor(calc)));//hour
    }

    calc = ((calc - (time[time.length - 1] || 0)) * s) / 60;
    time.push(format(Math.floor(calc)));//minute

    calc = (calc - (time[time.length - 1])) * 60;
    time.push(format(Math.round(calc)));//second


    function format(n) {//it makes "0X"/"00"/"XX"
        return (("" + n) / 10).toFixed(1).replace(".", "");
    }

    //if (!hasHours) time.shift();//you can set only "min: sec"

    return time.join(":");
};

async function play(bot, ops, data, rInfo, formato, info, message) {

    const embed = new Discord.RichEmbed()
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setTitle('Deseja ouvir no youtube? Clique aqui!')
        .setURL(`https://www.youtube.com/${data.queue[0].url}`)
        .setColor(2257043)
        .addField(`<:disco:486254981318574131>   Nome da música `, `${data.queue[0].songTitle} `, true)
        .addField(`:stopwatch: Tempo da música `, `${data.queue[0].duracao} minutos`, true);

    message.channel.send(embed);

    data.dispatcher = await data.connection.playStream(yt(data.queue[0].url, { filter: 'audioonly' }));
    data.dispatcher.guildID = data.guildID;

    let fetched = ops.active.get(message.guild.id);
    fetched.dispatcher.setVolume(50 / 100);

    data.dispatcher.once('end', function () {
        finish(bot, ops, this, rInfo, formato, info, message);
    })
}

async function finish(bot, ops, dispatcher, rInfo, formato, info, message) {
    let fetched = ops.active.get(dispatcher.guildID);
    fetched.queue.shift();

    if (fetched.queue.length > 0) {
        ops.active.set(dispatcher.guildID, fetched);
        play(bot, ops, fetched, rInfo, formato, info, message)
    } else {
        ops.active.delete(dispatcher.guildID);
        let vc = bot.guilds.get(dispatcher.guildID).me.voiceChannel;
        if (vc) vc.leave();
    }
}