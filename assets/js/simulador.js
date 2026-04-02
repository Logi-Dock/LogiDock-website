function calcular() {
    // Valores usados na simulação
    const docas = 10; // Quantidade de docas em operação
    const caminhoesPorDoca = 5; // Média de caminhões atendidos por doca por dia
    const percentualAtraso = 0.3; // 30% das operações geram atraso
    const toneladas = 10; // Peso médio do caminhão em toneladas
    const horas = 3; // Horas excedidas na operação
    const valor = 2.41; // Valor da estadia por tonelada/hora

    // Cálculo da quantidade total de operações e das ocorrências com atraso
    const operacoes = docas * caminhoesPorDoca;
    const ocorrencias = operacoes * percentualAtraso;

    // CENÁRIO SEM O SISTEMA:
    // calcula o prejuízo atual com base nas ocorrências de atraso
    const custoDia = ocorrencias * horas * toneladas * valor;
    const custoMes = custoDia * 30;
    const custoAno = custoDia * 365;

    // Nomes e percentuais de redução para cada cenário analisado
    const nomes = ["Conservador", "Moderado", "Otimista"];
    const reducoes = [0.3, 0.5, 0.7];

    console.log("\n===== SIMULADOR FINANCEIRO =====");

    // Exibe dados gerais da operação
    console.log("\nDADOS DA OPERAÇÃO");
    console.log("Operações por dia:", operacoes);
    console.log("Ocorrências estimadas:", ocorrencias);

    // Exibe o prejuízo atual sem o uso do sistema
    console.log("\nPREJUÍZO ATUAL");
    console.log("Dia:", custoDia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    console.log("Mês:", custoMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    console.log("Ano:", custoAno.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

    console.log("\n===== CENÁRIOS =====");

    // Percorre os cenários para calcular economia e novo prejuízo
    for (let i = 0; i < nomes.length; i++) {
        const nomeCenario = nomes[i];
        const reducao = reducoes[i];

        // Calcula quanto seria economizado com o sistema
        const economiaMes = custoMes * reducao;
        const economiaAno = custoAno * reducao;

        // Calcula o prejuízo restante após aplicar a redução
        const novoCustoMes = custoMes - economiaMes;
        const novoCustoAno = custoAno - economiaAno;

        // Exibe os resultados de cada cenário
        console.log(`\n${nomeCenario.toUpperCase()} (${reducao * 100}% de redução)`);
        console.log("Economia por mês:", economiaMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        console.log("Economia por ano:", economiaAno.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        console.log("Novo prejuízo por mês:", novoCustoMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        console.log("Novo prejuízo por ano:", novoCustoAno.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    }
}

calcular();