const db = require('quick.db')
const roleMute = new db.table('configs');
const controller = require('../../db/controller.js');

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`_**__ATENÇÃO__ você não possui permissões suficientes.**_`)
    let prefix = controller.getData(message.guild.id, 'prefix', roleMute);
    let find = roleMute.get(`${message.guild.id}.mutedRole`);   

    if (args[0] == 'delete') {
        let findrole = roleMute.get(`${message.guild.id}.mutedRole`);
        let rolemute = message.guild.roles.find('name', findrole);
        roleMute.delete(`${message.guild.id}.muteRole`);
        rolemute.delete('.');
        message.channel.send('_Configurações resetadas._');
        return;
    }

    //if (find == null || find == '') return;
    if (message.guild.roles.find('name', find)) {
        return message.channel.send(`_**__ATENÇÃO__ a role já está configurada!**_\nQuer outra configuração? Digite \`${prefix}configmute delete\``);
    }

    if (!args[0]) return message.channel.send(`_**Insira a role para definir como mutado!\n Ex: ${prefix}configmute <role>**_`);

    roleMute.set(`${message.guild.id}.mutedRole`, `${args[0]}`);
    let findR = roleMute.get(`${message.guild.id}.mutedRole`);

    let muterole = message.guild.roles.find(`name`, `${findR}`);

    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: `${args[0]}`,
                color: "#8a8383",
                permissions: []
            });

            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    READ_MESSAGES: false
                });
            });

            message.channel.send(`_Role \`${args[0]}\` criada e configurada com sucesso!_`);
        } catch (error) {
            console.log(error);
            message.channel.send('_Erro ao criar e configurar a role._');
        }
    }
}

module.exports.config = {
    command: 'configmute'
}