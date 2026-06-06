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

function totalUsuarios(fk_empresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente.")
    var instrucaoSql =
        `
       SELECT COUNT(*) as Total, COUNT(CASE WHEN nome_nivel_acesso ='ADMINISTRADOR' THEN 1 END) AS ADMINISTRADORES, 
COUNT(CASE WHEN nome_nivel_acesso = 'GESTOR' THEN 1 END) AS GESTORES,
COUNT(CASE WHEN nome_nivel_acesso = 'FUNCIONÁRIO' THEN 1 END) AS FUNCIONÁRIOS from usuario u
JOIN nivel_acesso na
ON u.fk_nivel_acesso = na.id_nivel_acesso
WHERE fk_empresa = ${fk_empresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterNiveisAcesso,
    totalUsuarios
}
