function calcular() {
  // Valores INPUTS
  const docas = parseInt(document.getElementById("docas").value, 10); // Quantidade de docas em operação
  const caminhoesPorDoca = parseInt(document.getElementById("caminhoesPorDoca").value, 10); // Média de caminhões atendidos por doca por dia
  const toneladas = parseFloat(document.getElementById("toneladas").value); // Peso médio do caminhão em 

  // Validação (se o usuário preencheu tudo) 
  if (isNaN(docas) || isNaN(caminhoesPorDoca) || isNaN(toneladas)) {
    alert("Por favor, preencha todos os campos antes de calcular.");
    return; // Para a função aqui se algum campo estiver vazio
  }

  // Valores MOCKADOS
  const horas = 3; // Horas excedidas na operação
  const percentualAtraso = 0.3; // 30% das operações geram atraso
  const valor = 2.41; // Valor da estadia por tonelada/hora

  // Cálculo da quantidade total de operações e das ocorrências com atraso
  const operacoes = docas * caminhoesPorDoca;
  const ocorrencias = operacoes * percentualAtraso;

  // CENÁRIO SEM O SISTEMA:
  // calcula o prejuízo atual com base nas ocorrências de atraso
  const custoDia = ocorrencias * horas * toneladas * valor;
  const custoMes = custoDia * 30;
  const custoAno = custoDia * 365;

  // Mostramdo o prejuízo atual na tela (encontra o elemento HTML pelo id e troca o texto dele)
  document.getElementById("resultado-mes").textContent =
    custoMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  document.getElementById("resultado-ano").textContent =
    custoAno.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // Nomes e percentuais de redução para cada cenário analisado
  const nomes = ["conservador", "moderado", "otimista"];
  const reducoes = [0.3, 0.5, 0.7];

  // Percorre os três cenários e preenche cada card na tela
  for (let i = 0; i < nomes.length; i++) {

    const reducao = reducoes[i];

    // Quanto o sistema economiza por mês e por ano
    const economiaMes = custoMes * reducao;
    const economiaAno = custoAno * reducao;

    // Quanto ainda sobra de prejuízo após a redução
    const novoCustoMes = custoMes - economiaMes;
    const novoCustoAno = custoAno - economiaAno;

    // Formatação de moeda brasileira para exibição
    const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Preenche os elementos do card correspondente no HTML
    // O id de cada elemento segue o padrão: "nome-do-campo-nomeCenario"
    document.getElementById(`economia-mes-${nomes[i]}`).textContent = fmt(economiaMes);
    document.getElementById(`economia-ano-${nomes[i]}`).textContent = fmt(economiaAno);
    document.getElementById(`novo-custo-mes-${nomes[i]}`).textContent = fmt(novoCustoMes);
    document.getElementById(`novo-custo-ano-${nomes[i]}`).textContent = fmt(novoCustoAno);
  }

  // Seção dos resultados
  document.getElementById("resultados").style.display = "block";
}