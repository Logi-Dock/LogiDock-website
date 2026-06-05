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

function PegarAvisos(fk_empresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function PegarAvisos():")

    var instrucaoSql = `
        SELECT e.id_empresa, d.numero_doca, hs.dt_registro,
            CASE 
                WHEN hs.status_sensor = 1 
                THEN TIMESTAMPDIFF(MINUTE, hs.dt_registro, NOW())
            END AS tempo_acumulado_min
        FROM empresa e
        JOIN doca d ON d.fk_empresa = e.id_empresa
        JOIN sensor s ON s.fk_doca = d.id_doca
        JOIN historico_sensor hs ON hs.fk_sensor = s.id_sensor
            WHERE hs.dt_registro = (
                SELECT MAX(dt_registro)
                FROM historico_sensor
                WHERE fk_sensor = s.id_sensor
                ) 
                AND hs.status_sensor = 1 
                AND e.id_empresa = ${fk_empresa}
                AND TIMESTAMPDIFF(MINUTE, hs.dt_registro, NOW()) >= 270;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function vizualizarDadosEmpresa(fk_empresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function PegarAvisos():")

    var instrucaoSql = `
        SELECT
        e.razao_social,
        e.cnpj,
        l.logradouro,
        l.numero_endereco,
        l.cidade,
        l.estado
        FROM endereco l
        JOIN empresa e ON l.id_endereco - e.fk_endereco
        WHERE e.id_empresa = ${fk_empresa};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    IntegrarUsuarioNaEmpresa,
    PegarIdEmpresa,
    PegarAvisos,
    vizualizarDadosEmpresa
}
