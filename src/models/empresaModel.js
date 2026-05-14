var database = require("../database/config")


function IntegrarUsuarioNaEmpresa(id_usuario, id_empresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", id_usuario, id_empresa);
    
    var instrucaoSql = `
        INSERT INTO usuario_empresa (fk_usuario, fk_empresa) VALUES (${id_usuario}, ${id_empresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function PegarIdEmpresa(codigo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", codigo);
    
    var instrucaoSql = `
        SELECT id_empresa FROM empresa WHERE codigo = '${codigo}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    IntegrarUsuarioNaEmpresa,
    PegarIdEmpresa
}
