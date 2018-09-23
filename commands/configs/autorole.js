const db = require('quick.db');
var role = new db.table('configs');
let controller = require('../../db/controller.js');

module.exports.run = async (bot, message, args, database) => {
    let prefix = controller.getData(message.guild.id, 'prefix', role);
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`_**__ATENÇÃO__ você não possui permissões suficientes.**_`)
    if (!args[0]) return message.channel.send(`**Insira um cargo para auto role: Ex => \`${prefix}autorole <role>\`\nPara remover o autorole digite => \`${prefix}autorole none\`**`);

    var notRole = message.guild.roles.find(`name`, args[0]);

    if (args[0] === 'none') {
        role.set(`${message.guild.id}.autoRole`, `${args[0]}`);
        message.channel.send(`**_Auto role removida com sucesso._**`);
    } else if (!notRole) {
        return message.channel.send(`**A role informada não existe no servidor!**`)
    } else {
        try {
            role.set(`${message.guild.id}.autoRole`, `${args[0]}`);
            message.channel.send(`**Auto role setado com sucesso. Role setada => \`${args[0]}\`**`);
        } catch (error) {
            message.channel.send(`**Ocorreu um erro, não foi possivel setar a role => \`${args[0]}\`**`);
            console.log(error)
        }
    }
}

module.exports.config = {
    command: 'autorole'
}