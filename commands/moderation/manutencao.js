
module.exports.run = async (bot, message, args, ops, database) => {
    if (message.author.id !== '216691050293624833') return ('**ATENÇÃO** você não tem permissões para usar este comando!');
    if (!args[0]) return message.channel.send('Você deve informar se quer ativar ou desativar a manutenção!');

    if (args[0] == 'ativar') {
        try {
            database.ref(`Manutenção`)
                .update({ manutenção: true });
            await message.channel.send('_Acabei de entrar em manutenção, voltarei em breve!_');
            await bot.user.setActivity(`Estou em manutenção.`, 'https://www.twitch.tv/C-3PO');
        } catch (error) {
            message.channel.send('_Erro ao solicitar a manutenção._');
            console.error(error);
        }
    } else if (args[0] == 'desativar') {
        try {
            database.ref(`Manutenção`)
                .update({ manutenção: false });
            await message.channel.send('_Acabei de sair da manutenção!_');
            await bot.user.setActivity(`/ajuda | Online em ${bot.guilds.size} servidores`, 'https://www.twitch.tv/C-3PO');
        } catch (error) {
            message.channel.send('_Erro ao remover a manutenção._');
            console.error(error);
        }
    }
}

module.exports.config = {
    command: 'manutencao'
}