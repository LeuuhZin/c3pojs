
module.exports.setData = (idServer, propriedade, controller, value) => {
    controller.set(`${idServer}.${propriedade}`, `${value}`);
}

module.exports.getData = (idServer, propriedade, controller) => {
    global.retorno = '';
    retorno = controller.get(`${idServer}.${propriedade}`);

    return retorno;
}

module.exports.deleteData = (idServer, propriedade, controller) => {
    controller.delete(`${idServer}.${propriedade}`);
}

module.exports.hasData = (idServer, propriedade, controller) => {
    global.retorno = false;

    if (controller.has(`${idServer}.${propriedade}`)) {
        retorno = true;
    } else {
        retorno = false;
    }

    return retorno;
}