
const gifSearch = require("gif-search")
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {

    let pesq = args.join(" ")
    if (!pesq) return message.channel.send('_Informe a pesquisa para o gif._');
    gifSearch.random(pesq).then(
        gifUrl => message.channel.send({
            embed: {
                title: `Resultado da pesquisa de GIF's: ${pesq}`,
                image: { url: gifUrl },
                color: 49151
            }
        }));
}

module.exports.config = {
    command: "gif"
}