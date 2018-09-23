const db = require('quick.db');
var configChannel = new db.table(`configs`);

module.exports.run = async (bot, message, args, ops, database) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`_**__ATENÇÃO__ você não possui permissões suficientes.**_`);
    if (!args[0]) return message.channel.send('**Insira o nome do canal que deseja configurar!**');

    try {
        let canalExiste = message.guild.channels.find('name', args[0]);
        if (canalExiste) {
            message.channel.send(`**_O canal já está configurado!_**`);
        } else {
            if (!configChannel.has(`${message.guild.id}.canal`)) {
                configChannel.set(message.guild.id + '.canal', `${args[0]}`);
                message.guild.createChannel(args[0], 'text');
                message.channel.send(`**_Canal criado e configurado com sucesso!_**`);

            } else {
                let canal = configChannel.get(`${message.guild.id}.canal`);

                let novoCanal = message.guild.channels.find(`name`, `${args[0]}`);
                console.log(`Novo canal => ${novoCanal}`);

                let canalDeletado = message.guild.channels.find('name', canal);

                message.guild.createChannel(args[0], 'text');
                configChannel.set(`${message.guild.id}.canal`, `${args[0]}`);

                message.channel.send(`**_Canal criado e configurado com sucesso!_**`);

                canalDeletado.delete('Deletando canal');
            }
        }
    } catch (error) {
        message.channel.send(`**_Erro ao criar e configurar o canal!_**`);
        console.log(error);
    }

}

module.exports.config = {
    command: 'configlogs'
}