const pesquisa = require('yt-search')

module.exports.run = async (bot, message, args, ops) => {


    pesquisa(args.join(' '), async function (err, res) {
        if (err) return message.channel.send('Desculpe, algo deu errado');

        let videos = res.videos.slice(0, 5);

        let resp = `**Lista de vídeos -> Escolha de 1 - ${videos.length}**\n`

        for (var i in videos) {
            resp += `**[${parseInt(i) + 1}]: **` + `\`${videos[i].title}\`\n`;
        }

        message.channel.send(resp);

        const filter = m => !isNaN(m.content) && m.content < videos.length + 1 && m.content > 0;
        const collector = message.channel.createMessageCollector(filter);

        collector.videos = videos;

        await message.channel.send('**Você tem 10 segundo para selecionar uma música.**')
            .then(() => {
                message.channel.awaitMessages(response => response.content, {
                    max: 1,
                    time: 10000,
                    errors: ['time'],
                })
                    .then((collected) => {
                        collector.once('collect', function (m) {
                            let commandFile = require(`./play.js`);
                            commandFile.run(bot, message, [this.videos[parseInt(m.content) - 1].url], ops)
                        });
                    })
                    .catch(() => {
                        message.channel.send('**O tempo para escolher a música acabou.**');
                    });
            });

    });
}

module.exports.config = {
    command: 'pesquisar'
}
