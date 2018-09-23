const db = require('quick.db');
var config = new db.table(`configs`);
const controller = require('../../db/controller.js');

module.exports.run = async (bot, message, args) => {
    let admin = bot.emojis.get('486496267866734592');
    let config = bot.emojis.get('486496268231639061');
    let disco = bot.emojis.get('486254981318574131');
    let imagem = bot.emojis.get('492036737019674644');
    let voltar = bot.emojis.get('489097459440680960');
    let fun = bot.emojis.get('492037790100488213');

    message.channel.send(sendEmbed(message, 1, bot)).then(async (msg) => {
        await msg.react(admin);
        await msg.react(disco);
        await msg.react(config);
        await msg.react(fun);
        await msg.react(imagem);
        await msg.react(voltar);


        bot.on('messageReactionAdd', (reaction, user) => {
            if (reaction.emoji.name === 'voltar' && user.id !== bot.user.id && reaction.message.id === msg.id) {
                reaction.remove(user);
                user.send(sendEmbed(msg, 1, bot));
            }

            if (reaction.emoji.name === 'admin' && user.id !== bot.user.id && reaction.message.id === msg.id) {
                reaction.remove(user);
                user.send(sendEmbed(msg, 2, bot));
            }

            if (reaction.emoji.name === 'disco' && user.id !== bot.user.id && reaction.message.id === msg.id) {
                reaction.remove(user);
                user.send(sendEmbed(msg, 3, bot));
            }

            if (reaction.emoji.name === 'config' && user.id !== bot.user.id && reaction.message.id === msg.id) {
                reaction.remove(user);
                user.send(sendEmbed(msg, 4, bot));
            }

            if (reaction.emoji.name === 'fun' && user.id !== bot.user.id && reaction.message.id === msg.id) {
                reaction.remove(user);
                user.send(sendEmbed(msg, 5, bot));
            }

            if (reaction.emoji.name === 'imagem' && user.id !== bot.user.id && reaction.message.id === msg.id) {
                reaction.remove(user);
                user.send(sendEmbed(msg, 6, bot));
            }
        })
    });
};

module.exports.config = {
    command: 'ajuda'
}

function sendEmbed(message, numero, bot) {
    global.prefix = controller.getData(message.guild.id, 'prefix', config);
    switch (numero) {
        case 1: return {
            embed: {
                color: 3447003,
                author: {
                    name: 'Minhas informações',
                    icon_url: bot.user.avatarURL
                },
                description: "Abaixo estão algumas informações sobre meu funcionamento. Para saber quais comandos estão disponíveis reaja nos emojis abaixo.",
                fields: [
                    {
                        name: '<:server:486177812600848405> Servidores',
                        value: `[\`${bot.guilds.size} servidores\`]`,
                        inline: true
                    },
                    {
                        name: '<:users:486177811686621186> Usuários',
                        value: `[\`${bot.users.size} usuários\`]`,
                        inline: true
                    },
                    {
                        name: '<:versao:486183591399784458> Versão',
                        value: '[`Versão: 1.0.2`]',
                        inline: true
                    },
                    {
                        name: '<:prefix:486186548526579712> Prefixo padrão',
                        value: `[\`Utilize ${controller.getData(message.guild.id, 'prefix', config)}\`]`,
                        inline: true
                    },
                    {
                        name: '<:node:489095125616820242> Linguagem',
                        value: '[`JavaScript - NodeJS`]',
                        inline: true
                    },
                    {
                        name: '<:adicionar:486174837472231477> Me adicione',
                        value: '[Clique aqui](https://discordapp.com/api/oauth2/authorize?client_id=488022333500424203&permissions=8&scope=bot)',
                        inline: true
                    }
                ],

                footer: {
                    text: '© 2018 - Todos os direitos reservados',
                    icon_url: `${bot.users.find(`id`, '216691050293624833').avatarURL}`
                }
            }
        };

        case 2: return {
            embed: {
                color: 3447003,
                author: {
                    name: 'Comandos de moderação',
                    icon_url: bot.user.avatarURL
                },

                description: `**${prefix}ban <user> <razão>** - Irá banir o usuário do servidor\n` +
                    `**${prefix}kick <user> <razão>** - Irá kickar o usuário do servidor\n` +
                    `**${prefix}limparmsg <quantidade>** - Apaga de 1 a 100 menssagens\n` +
                    `**${prefix}setname <usuario> <apelido>** - Troca o apelido do usuário mencionado\n` +
                    `**${prefix}tempmute <usuario> <tempo | 1s/m/h/d>** - Muta o usuário temporariamente\n`
            }
        };

        case 3: return {
            embed: {
                color: 3447003,
                author: {
                    name: 'Comandos de música',
                    icon_url: bot.user.avatarURL
                },

                description: `**${prefix}play <nome | url>** - Toca a música que foi escolhida\n` +
                    `**${prefix}pause** - Pausa a música atual\n` +
                    `**${prefix}resume _Em breve_** - Despausa a música atual\n` +
                    `**${prefix}playlist** - Mostra as músicas que estão na fila\n` +
                    `**${prefix}skip** - Inicia uma votação para pular a música\n` +
                    `**${prefix}stop** - Para de tocar música\n`
            }
        };

        case 4: return {
            embed: {
                color: 3447003,
                author: {
                    name: 'Comandos de configuração',
                    icon_url: bot.user.avatarURL
                },

                description: `**${prefix}autorole <role>** - Ativa a auto role no servidor\n` +
                    `**${prefix}configlogs <canal>** - Cria um canal de logs (Nescessário para os comandos de moderação) \n` +
                    `**${prefix}configmute <role>** - Configura a role de mutado (Nescessário para usar o tempmute)\n` +
                    `**${prefix}prefix <novoPrefixo>** - Troca o prefixo do bot no servidor\n`
            }
        };

        case 5: return {
            embed: {
                color: 3447003,
                author: {
                    name: 'Comandos de diversão',
                    icon_url: bot.user.avatarURL
                },

                description: `**${prefix}ascii <texto>** - Converte seu texto para ascii\n` +
                    `**${prefix}avatar <usuario>** - Mostra o avatar do usuário mencionado \n` +
                    `**${prefix}cpf <gerar>** - Gera um CPF aleatório \n` +
                    `**${prefix}gif <pesquisa>** - Retorna um gif baseado em sua pesquisa\n` +
                    `**${prefix}tapa <usuario>** - Retorna uma imagem do batman dando um tapa no robin com a imagem do autor e do usuário mencionado\n` +
                    `**${prefix}continue <linkDaImagem>** - Retorna a imagem que você informou com "To be continue" no canto inferior esquerdo\n`
            }
        };

        case 6: return {
            embed: {
                color: 3447003,
                author: {
                    name: 'Comandos de manipulação de imagem',
                    icon_url: bot.user.avatarURL
                },

                description: `**${prefix}invert <usuario>** - Inverte as cores do seu avatar\n` +
                    `**${prefix}redimensionar <usuario> <x> <y>** - Redimensiona seu avatar de acordo com X e Y \n` +
                    `**${prefix}sepia <usuario>** - Aplica o efeito sepia em seu avatar\n` +
                    `**${prefix}circle <usuario>** - Sua foto fica em forma de circulo\n` +
                    `**${prefix}diamond <usuario>** - Sua foto fica em forma de diamante\n` +
                    `**${prefix}polygon <usuario>** - Sua foto fica em forma de polígono\n`
            }
        };

    }

    //return embed;
}
