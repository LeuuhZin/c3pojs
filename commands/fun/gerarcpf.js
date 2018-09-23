const cpf = require('gerador-validador-cpf');

module.exports.run = async(bot, message, args) => {
    if (!args[0]) return message.channel.send('_Insira uma propriedade_ => `gerar` ou `validar` ')
    if (args[0] == "gerar") {
        message.channel.send(`_CPF gerado => ${cpf.generate()}_`);
    }

    args.join(" ").slice(22);
    if (args[0] == "validar") {
        if (!args[1]) return (`**Infome o CPF!**`);
        if (cpf.validate(args[1])) {
            message.channel.send('O CPF informado é **válido**!');
        } else {
            message.channel.send('O CPF informado é **inválido**!');
        }
    }
}

module.exports.config = {
    command: 'cpf'
}