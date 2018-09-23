/*
HOST ZEIT
require('http').createServer().listen(8000)
*/

//CONSTANTES

module.exports.botRun = () => {
    const Discord = require('discord.js');
    const bot = new Discord.Client();
    const active = new Map();
    const db = require('quick.db');
    const configdb = new db.table('configs');
    const controller = require('./db/controller.js');
    const commands = require('./cmds.js');
    var fs = require('fs');

    //Bot commands
    bot.commands = new Discord.Collection();

    bot.on('ready', () => {
        console.log("Iniciado com sucesso!");
        bot.user.setActivity(`/ajuda | Online em ${bot.guilds.size} servidores`, 'https://www.twitch.tv/C-3PO');

        //Carregar HANDLER
        commands.runCmd(fs, bot);
    });

    bot.on('guildMemberAdd', async member => {
        //let canal = bot.channels.find('id', '492851224324866058');
        //console.log(canal.id);

        bot.channels.get('492851224324866058').send(`Olá <@${member.id}>, seja bem-vindo.\nVocê deve se cadastrar reagindo no emoji abaixo.`)
            .then(async (msg) => {
                await msg.react('✅');
                bot.on('messageReactionAdd', (reaction, user) => {
                    if (reaction.emoji.name === '✅' && user.id !== bot.user.id && user.id === member.id) {
                        reaction.remove(user);
                        let role = member.guild.roles.find('name', 'Cadastrado');
                        member.addRole(role.id);
                    }
                });
            });

        let role = configdb.get(`${member.guild.id}.autoRole`);

        if (role == null || role == '' || role == 'none') return;
        else {
            var idRole = member.guild.roles.find(`name`, role).id;
            member.addRole(idRole);
        }
    });


    bot.on('guildCreate', guild => {
        bot.user.setActivity(`/ajuda | Online em ${bot.guilds.size} servidores`, 'https://www.twitch.tv/C-3PO');
    })

    bot.on('guildDelete', guild => {
        bot.user.setActivity(`/ajuda | Online em ${bot.guilds.size} servidores`, 'https://www.twitch.tv/C-3PO');
    })

    bot.on('message', async message => {

        global.prefix = '';
        let trueFalse = controller.hasData(message.guild.id, 'prefix', configdb);

        if (trueFalse) {
            prefix = controller.getData(message.guild.id, 'prefix', configdb);
        } else {
            controller.setData(message.guild.id, 'prefix', configdb, '/');
            prefix = '/';
        }

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const comando = args.shift().toLowerCase();

        var ops = {
            active: active
        }

        if (!message.content.startsWith(prefix)) return;
        if (message.author.bot) return;
        if (message.channel.type === 'dm') return message.reply('Opa opa, você não pode usar comandos no meu privado!')
        var cmd = bot.commands.get(comando);
        if (cmd) cmd.run(bot, message, args, ops);
        
    });

    bot.login(process.env.TOKEN);

}