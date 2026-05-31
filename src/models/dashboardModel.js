var database = require("../database/config")

function kpiDocaMaisAtrasos(fk_empresa, periodo) {
    var instrucaoSql = ` 
    SELECT
    \`Número da Doca\` as doca,
    COUNT(*) AS qtd_atrasos
    FROM ocorrencias_docas
    WHERE \`ID da Empresa\` = ${fk_empresa}
    AND \`Tipo de Ocorrência\` COLLATE utf8mb4_0900_ai_ci LIKE 'Em Atraso'
    AND \`Data de Entrada\` >= NOW() - INTERVAL ${periodo}
    GROUP BY \`Número da Doca\`
    ORDER BY qtd_atrasos
    DESC LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiDocaMaiorAtraso(fk_empresa, periodo) {
    var instrucaoSql = ` 
    SELECT
    \`Número da Doca\` AS doca,
    DATE_FORMAT(\`Data de Entrada\`, '%d/%m') AS data,
    DATE_FORMAT(\`Data de Entrada\`, '%H:%i') AS hora_inicio,

    CASE
        WHEN \`Data da Saída\` IS NULL
        THEN 'Agora'
        ELSE DATE_FORMAT(\`Data da Saída\`, '%H:%i')
    END AS hora_fim,

    TIMESTAMPDIFF(MINUTE,  \`Data de Entrada\`,
    CASE
        WHEN \`Data da Saída\` IS NULL
        THEN NOW()
        ELSE \`Data da Saída\`
    END) AS minutos_atraso
    FROM ocorrencias_docas

    WHERE \`ID da Empresa\` = ${fk_empresa}
    AND \`Tipo de Ocorrência\` COLLATE utf8mb4_0900_ai_ci LIKE 'Em Atraso%'
    AND \`Data de Entrada\` >= NOW() - INTERVAL ${periodo}
    ORDER BY minutos_atraso
    DESC LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiDocaMaiorTaxaDeAtrasos(fk_empresa, periodo) {
    var instrucaoSql = ` 
    SELECT
    \`Número da Doca\` AS doca,
    COUNT(CASE
        WHEN \`Tipo de Ocorrência\` COLLATE utf8mb4_0900_ai_ci LIKE '%Atraso%'
        THEN 1
    END) AS qtd_atrasos,
    COUNT(*) AS qtd_operacoes,
    ROUND(COUNT(CASE
            WHEN \`Tipo de Ocorrência\` COLLATE utf8mb4_0900_ai_ci LIKE '%Atraso%'
            THEN 1
        END
    ) * 100.0 / COUNT(*), 0) AS percentual

    FROM ocorrencias_docas
    WHERE \`ID da Empresa\` = ${fk_empresa}
    AND \`Data de Entrada\` >= NOW() - INTERVAL ${periodo}

    GROUP BY \`Número da Doca\`
    HAVING qtd_atrasos > 0
    ORDER BY percentual DESC, qtd_atrasos
    DESC LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiDocaMaiorTempoDeAtrasoAcumulado(fk_empresa, periodo) {
    var instrucaoSql = ` 
    SELECT
    \`Número da Doca\` AS doca,
    SUM(TIMESTAMPDIFF(MINUTE,  \`Data de Entrada\`,
    CASE
        WHEN \`Data da Saída\` IS NULL
        THEN NOW()
        ELSE \`Data da Saída\`
    END)) AS minutos_atraso
    FROM ocorrencias_docas

    WHERE \`ID da Empresa\` = ${fk_empresa}
    AND \`Tipo de Ocorrência\` COLLATE utf8mb4_0900_ai_ci LIKE 'Em Atraso%'
    AND \`Data de Entrada\` >= NOW() - INTERVAL ${periodo}
    GROUP BY doca
    ORDER BY minutos_atraso
    DESC LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoTempoMedioPorDoca(fk_empresa, limite_linhas) {
    var instrucaoSql = `
        SELECT
            \`Número da Doca\` AS doca,

            ROUND(
                AVG(
                    TIMESTAMPDIFF(
                        MINUTE,
                        \`Data de Entrada\`,
                        CASE
                            WHEN \`Data da Saída\` IS NULL
                            THEN NOW()
                            ELSE \`Data da Saída\`
                        END
                    )
                ),
                0
            ) AS tempo_medio_minutos

        FROM ocorrencias_docas

        WHERE \`ID da Empresa\` = ${fk_empresa}
        AND \`Data de Entrada\` >= NOW() - INTERVAL ${periodo}

        GROUP BY \`Número da Doca\`
        ORDER BY doca;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoDocasComMaisAtrasos(fk_empresa) {
    var instrucaoSql = `
        SELECT
            \`Tipo de Ocorrência\` AS status,
            COUNT(*) AS quantidade

        FROM ocorrencias_docas

        WHERE \`ID da Empresa\` = ${fk_empresa}
        AND \`Data de Entrada\` >= NOW() - INTERVAL ${periodo}

        GROUP BY \`Tipo de Ocorrência\`;
    `;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoTempoDePermanenciaPorOperacao(fk_empresa, limite_linhas) {
    var instrucaoSql = `
        SELECT
            \`Número da Doca\` AS doca,

            \`Data de Entrada\` AS inicio,

            CASE
                WHEN \`Data da Saída\` IS NULL
                THEN NOW()
                ELSE \`Data da Saída\`
            END AS fim,

            \`Tipo de Ocorrência\` AS status

        FROM ocorrencias_docas

        WHERE \`ID da Empresa\` = ${fk_empresa}
        AND \`Data de Entrada\` >= NOW() - INTERVAL ${periodo}

        ORDER BY inicio;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    kpiDocaMaisAtrasos,
    kpiDocaMaiorAtraso,
    kpiDocaMaiorTaxaDeAtrasos,
    kpiDocaMaiorTempoDeAtrasoAcumulado,

    graficoTempoMedioPorDoca,
    graficoDocasComMaisAtrasos,
    graficoTempoDePermanenciaPorOperacao
}
