var database = require("../database/config")

function cadastrarDocaESensor(numero_doca,status_doca, fk_empresa){
    console.log("ACESSEI O DOCA MODEL\n\n\t\t >> function cadastrarDocaESensor():", numero_doca, status_doca, fk_empresa);

    var instrucaoSql = `
            INSERT INTO doca (numero_doca , status_doca, fk_empresa) VALUES ('${numero_doca}', '${status_doca}', ${fk_empresa});
        `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql).then(function (resultado) {
            var id_doca_inserida =resultado.insertId;
            var instrucaoSensor = `
            INSERT INTO sensor (fk_doca)
            VALUES (${id_doca_inserida});
            `;
        
        console.log("Executando a instrução SQL (sensor): \n" + instrucaoSensor);
        return database.executar(instrucaoSensor).then(function (resultadoSensor) {
            return{
                id_doca: id_doca_inserida,
                id_sensor: resultadoSensor.insertId  
            };
        });
    });
}

function editarDoca(id_doca, numero_doca, status_doca){
    console.log("ACESSEI O DOCA MODEL\n\n\t\t >> function editarDoca():", id_doca, numero_doca, status_doca);

    var instrucaoSql = `
    UPDATE doca
    SET numero_doca = '${numero_doca}', status_doca = '${status_doca}'
    WHERE id_doca = ${id_doca};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function listarDoca(fk_empresa){
    console.log("ACESSEI O DOCA MODEL\n\n\t\t >> function listarDocas():", fk_empresa);
 
    var instrucaoSql = `
        SELECT
            d.id_doca,
            d.numero_doca,
            d.status_doca,
            s.id_sensor,
            s.modelo_sensor
        FROM doca d
        LEFT JOIN sensor s 
        ON s.fk_doca = d.id_doca
        WHERE d.fk_empresa = ${fk_empresa}
        ORDER BY d.numero_doca;
    `;
 
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterDoca(id_doca) {
    console.log("ACESSEI O DOCA MODEL\n\n\t\t >> function obterDoca():", id_doca);
 
    var instrucaoSql = `
        SELECT
            d.id_doca,
            d.numero_doca,
            d.status_doca,
            d.fk_empresa,
            s.id_sensor,
            s.modelo_sensor
        FROM doca d
        LEFT JOIN sensor s 
        ON s.fk_doca = d.id_doca
        WHERE d.id_doca = ${id_doca};
    `;
 
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarDocaESensor,
    editarDoca,
    listarDoca,
    obterDoca
}