const db = require('quick.db');
var config = new db.table(`configs`);
const controller = require('../../db/controller.js');

module.exports.run = async (bot, message, args) => {
    if (message.author.id !== '216691050293624833' && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`_**__ATENÇÃO__ você não possui permissões suficientes.**_`);
    if (!args[0]) return message.channel.send('_**ATENÇÃO**_ informe o novo prefixo!');

    try {
        controller.setData(message.guild.id, 'prefix', config, args[0]);
        message.channel.send(`**Prefixo configurado com sucesso!**\n_Novo prefixo:_ \`${controller.getData(message.guild.id, 'prefix', config)}\``);
    } catch (error) {
        message.channel.send(`**_Erro ao configurar o novo prefixo!_**`);
    }
}

module.exports.config = {
    command: "prefix"
}