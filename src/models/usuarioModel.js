var database = require("../database/config");

function obterUsuario(id_usuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente.")
    var instrucaoSql =
        `
        SELECT
            id_usuario,
            nome_user,
            email_user,
            fk_nivel_acesso,
            na.nome_nivel_acesso,
            fk_empresa,
            e.razao_social
        FROM
            usuario
        JOIN nivel_acesso na ON fk_nivel_acesso = na.id_nivel_acesso
        JOIN empresa e ON fk_empresa = e.id_empresa
        WHERE id_usuario = ${id_usuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticar(email_user, senha_user) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email_user, senha_user)
    var instrucaoSql = `
        SELECT u.id_usuario, u.nome_user, u.email_user, e.razao_social, n.nome_nivel_acesso FROM usuario u
        JOIN empresa e ON e.id_empresa = u.fk_empresa
        JOIN nivel_acesso n ON n.id_nivel_acesso = u.fk_nivel_acesso
        WHERE email_user = '${email_user}' AND senha_user = '${senha_user}';
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
    obterUsuario,
    autenticar,
    cadastrarUsuario,
    PegarIdUsuario
}

