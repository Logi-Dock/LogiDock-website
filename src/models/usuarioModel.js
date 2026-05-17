var database = require("../database/config");

function autenticar(email_user, senha_user) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email_user, senha_user)
    var instrucaoSql = `
        SELECT id_usuario, nome_user, email_user FROM usuario WHERE email_user = '${email_user}' AND senha_user = '${senha_user}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function cadastrarUsuario(nome_user, email_user, senha_user) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome_user, email_user, senha_user);

    var instrucaoSql = `
        INSERT INTO usuario (nome_user, email_user, senha_user) VALUES ('${nome_user}', '${email_user}', '${senha_user}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function PegarIdUsuario(email_user) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", email_user);

    var instrucaoSql = `
        SELECT id_usuario, nome_user, email_user FROM usuario WHERE email_user = '${email_user}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrarUsuario,
    PegarIdUsuario
}

