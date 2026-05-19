var database = require("../database/config");

function obterNiveisAcesso() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente.")
    var instrucaoSql =
        `
        SELECT
            id_nivel_acesso,
            nome_nivel_acesso
        FROM nivel_acesso
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterNiveisAcesso
}
