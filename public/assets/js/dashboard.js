nome_funcionario.innerHTML = `${sessionStorage.NOME_USUARIO}`;
nome.innerHTML = `${sessionStorage.NOME_USUARIO}`;
empresa.innerHTML = `${sessionStorage.RAZAO_SOCIAL}`;
empresaUser.innerHTML = `${sessionStorage.RAZAO_SOCIAL}`;
permissao.innerHTML = `${sessionStorage.NOME_NIVEL_ACESSO}`;

let fk_empresa = sessionStorage.FK_EMPRESA;
let proximaAtualizacao;

let intervalo_selecionado = periodo.value;
let filtro_periodo = "24 HOUR";

let graficoGantt = null;
let graficoPizza = null;
let graficoTempoMedio = null;

function inicializarDashboard() {
    kpiDocaMaisAtrasos(fk_empresa);
    kpiDocaMaiorAtraso(fk_empresa);
    kpiDocaMaiorTaxaDeAtrasos(fk_empresa);
    kpiDocaMaiorTempoDeAtrasoAcumulado(fk_empresa);

    obterDadosGraficoTempoMedioPorDoca(fk_empresa);
    obterDadosGraficoDocasComMaisAtrasos(fk_empresa);
    obterDadosGraficoTempoDePermanenciaPorOperacao(fk_empresa);
}

// KPIS
function kpiDocaMaisAtrasos(fk_empresa) {
    let filtro_periodo = obterPeriodoSelecionado();

    fetch(`/dashboard/kpiDocaMaisAtrasos/${fk_empresa}/${filtro_periodo}/`)
        .then((resposta) => resposta.json())
        .then((dados) => {
            console.log(dados);

            document.getElementById('ipt_DocaMaisAtrasos').innerHTML = dados[0].doca;
            document.getElementById('detalhesKPI1').innerHTML = dados[0].qtd_atrasos;
        })
        .catch((erro) => {
            console.error("Erro ao buscar kpiDocaMaisAtrasos:", erro);
        })
}

function kpiDocaMaiorAtraso(fk_empresa) {
    let filtro_periodo = obterPeriodoSelecionado();

    fetch(`/dashboard/kpiDocaMaiorAtraso/${fk_empresa}/${filtro_periodo}/`)
        .then((resposta) => resposta.json())
        .then((dados) => {
            console.log(dados);

            document.getElementById('ipt_DocaAtrasoRecente').innerHTML = dados[0].doca;
            document.getElementById('detalhesKPI2').innerHTML = `(${dados[0].data} | ${dados[0].hora_inicio} - ${dados[0].hora_fim})`;
        })
        .catch((erro) => {
            console.error("Erro ao buscar kpiDocaMaiorAtraso:", erro);
        })
}

function kpiDocaMaiorTaxaDeAtrasos(fk_empresa) {
    let filtro_periodo = obterPeriodoSelecionado();

    fetch(`/dashboard/kpiDocaMaiorTaxaDeAtrasos/${fk_empresa}/${filtro_periodo}/`)
        .then((resposta) => resposta.json())
        .then((dados) => {
            console.log(dados);

            document.getElementById('ipt_DocaMaiorPercentual').innerHTML = dados[0].doca;
            document.getElementById('detalhesKPI3').innerHTML = `(${dados[0].percentual}% - ${dados[0].qtd_atrasos} atrasos de ${dados[0].qtd_operacoes} operações`;
        })
        .catch((erro) => {
            console.error("Erro ao buscar kpiDocaMaiorTaxaDeAtrasos:", erro);
        })
}

function kpiDocaMaiorTempoDeAtrasoAcumulado(fk_empresa) {
    let filtro_periodo = obterPeriodoSelecionado();

    fetch(`/dashboard/kpiDocaMaiorTempoDeAtrasoAcumulado/${fk_empresa}/${filtro_periodo}/`)
        .then((resposta) => resposta.json())
        .then((dados) => {
            console.log(dados);

            document.getElementById('ipt_DocaMaiorTempo').innerHTML = dados[0].doca;

            let total_em_minutos = Number(dados[0].minutos_atraso);

            let horas = Math.floor(total_em_minutos / 60);
            let minutos = total_em_minutos % 60;

            document.getElementById('detalhesKPI4').innerHTML = `(${horas}h ${minutos}m`;
        })
        .catch((erro) => {
            console.error("Erro ao buscar kpiDocaMaiorTempoDeAtrasoAcumulado:", erro);
        })
}

// GRÁFICO 1
function obterDadosGraficoTempoMedioPorDoca(fk_empresa) {
    const filtro_periodo = obterPeriodoSelecionado();

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/dashboard/graficoTempoMedioPorDoca/${fk_empresa}/${filtro_periodo}`)
        .then(res => res.json())
        .then(dados => {
            console.log("Tempo médio:", dados);
            plotarGraficoTempoMedioPorDoca(dados);
        })
        .catch(err => console.error(err));
}

function plotarGraficoTempoMedioPorDoca(dadosApi) {

    if (graficoTempoMedio) {
        graficoTempoMedio.destroy();
    }

    const labels = [];
    const dentroPrazo = [];
    const foraPrazo = [];
    const quasePrazo = [];
    const limite = [];

    for (let i = 0; i < dadosApi.length; i++) {

        const dado = dadosApi[i];

        labels.push(`Doca ${dado.doca}`);

        const horas = dado.tempo_medio_minutos / 60;

        dentroPrazo.push(0);
        foraPrazo.push(0);
        quasePrazo.push(0);

        if (horas <= 3) {
            dentroPrazo[i] = horas;
        } else if (horas <= 4) {
            quasePrazo[i] = horas;
        } else {
            foraPrazo[i] = horas;
        }

        limite.push(4);
    }

    graficoTempoMedio = new Chart(
        document.getElementById("ipt_GraficoBarrasLinhas"),
        {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: 'Dentro do prazo',
                        data: dentroPrazo,
                        backgroundColor: 'blue'
                    },
                    {
                        label: 'Fora do prazo',
                        data: foraPrazo,
                        backgroundColor: 'red'
                    },
                    {
                        label: 'Quase fora do prazo',
                        data: quasePrazo,
                        backgroundColor: 'orange'
                    },
                    {
                        type: 'line',
                        label: 'Limite Invisivel',
                        data: limite,
                        borderColor: 'red',
                        borderWidth: 2,
                        pointRadius: 0,
                        fill: false,
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Horas'
                        },
                        ticks: {
                            callback: function (value) {
                                return value + 'h';
                            }
                        }
                    },
                    x: {
                        stacked: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'TEMPO MÉDIO POR DOCA',
                        color: 'black',
                        font: {
                            size: 32
                        }
                    },
                    legend: {
                        labels: {
                            filter: item => item.text !== 'Limite Invisivel'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {

                                if (context.dataset.label === 'Limite Invisivel') {
                                    return null;
                                }

                                const horasDecimais = context.parsed.y;

                                const horas = Math.floor(horasDecimais);
                                const minutos = Math.round((horasDecimais - horas) * 60);

                                return `${context.dataset.label}: ${horas}h ${minutos}min`;
                            }
                        }
                    }
                }
            }
        }
    );
}

function atualizarGraficoTempoMedioPorDoca(fk_empresa, dados, myChart) {
    fetch(`/dashboard/graficoTempoMedioPorDoca/${fk_empresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                obterDadosGraficoTempoMedioPorDoca(fk_empresa);
                // alertar(novoRegistro, fk_empresa);
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);

                if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")

                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].momento_grafico)
                    console.log("Horário do último dado capturado:")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                    dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade

                    dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                    dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoTempoMedioPorDoca(fk_empresa, dados, myChart), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoTempoMedioPorDoca(fk_empresa, dados, myChart), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

// GRÁFICO 2 PIZZA
function obterDadosGraficoDocasComMaisAtrasos(fk_empresa) {
    const filtro_periodo = obterPeriodoSelecionado();

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/dashboard/graficoDocasComMaisAtrasos/${fk_empresa}/${filtro_periodo}`)
        .then(res => res.json())
        .then(dados => {
            console.log("Pizza:", dados);
            plotarGraficoDocasComMaisAtrasos(dados);
        })
        .catch(err => console.error(err));
}

function plotarGraficoDocasComMaisAtrasos(dadosApi) {
    const labels = [];
    const valores = [];

    if (graficoPizza) {
        graficoPizza.destroy();
    }

    for (let i = 0; i < dadosApi.length; i++) {
        const dado = dadosApi[i];

        labels.push(dado.doca);
        valores.push(dado.quantidade);
    }

    graficoPizza = new Chart(
        document.getElementById("ipt_GraficoPizza"),
        {
            type: "pie",
            data: {
                labels,
                datasets: [{
                    data: valores,
                    backgroundColor: ['#FF0000', '#dc1414', '#800000', 'gray']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'DOCAS COM MAIOR VOLUME DE ATRASOS',
                        color: 'black',
                        font: {
                            size: 24
                        }
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        }
    );
}

function atualizarGraficoDocasComMaisAtrasos(fk_empresa, dados, myChart) {
    fetch(`/dashboard/graficoDocasComMaisAtrasos/${fk_empresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                obterDadosGraficoDocasComMaisAtrasos(fk_empresa);
                // alertar(novoRegistro, fk_empresa);
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);

                if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")

                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].momento_grafico)
                    console.log("Horário do último dado capturado:")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                    dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade

                    dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                    dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoDocasComMaisAtrasos(fk_empresa, dados, myChart), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoDocasComMaisAtrasos(fk_empresa, dados, myChart), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

//GRÁFICO 3
function obterDadosGraficoTempoDePermanenciaPorOperacao(fk_empresa) {
    const filtro_periodo = obterPeriodoSelecionado();

    fetch(`/dashboard/graficoTempoDePermanenciaPorOperacao/${fk_empresa}/${filtro_periodo}`)
        .then(res => res.json())
        .then(dados => {
            console.log("Gantt:", dados);
            plotarGraficoTempoDePermanenciaPorOperacao(dados);
        })
        .catch(err => console.error(err));
}

function plotarGraficoTempoDePermanenciaPorOperacao(dadosApi) {
    const foraDoTempo = [];
    const dentroDoTempo = [];

    if (graficoGantt) {
        graficoGantt.destroy();
    }

    for (let i = 0; i < dadosApi.length; i++) {

        const registro = dadosApi[i];

        const inicio = new Date(registro.inicio);
        const fim = new Date(registro.fim);

        const horaInicio =
            inicio.getHours() +
            (inicio.getMinutes() / 60);

        const horaFim =
            fim.getHours() +
            (fim.getMinutes() / 60);

        const duracaoMinutos = Math.floor((fim - inicio) / (1000 * 60));

        const item = {
            duracaoMinutos,
            x: [horaInicio, horaFim],
            y: `Doca ${registro.doca}`
        };

        if (registro.status == "Em Atraso") {
            foraDoTempo.push(item);
        } else {
            dentroDoTempo.push(item);
        }
    }

    graficoGantt = new Chart(document.getElementById('ipt_GraficoDeGantt'), {
        type: 'bar',
        data: {
            datasets: [
                {
                    label: 'Fora do Prazo',
                    data: foraDoTempo,
                    backgroundColor: 'red',
                    borderColor: 'black',
                    borderWidth: 1
                },
                {
                    label: 'Dentro do Prazo',
                    data: dentroDoTempo,
                    backgroundColor: 'blue',
                    borderColor: 'black',
                    borderWidth: 1
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'VISÃO DIÁRIA – TEMPO DE PERMANÊNCIA POR OPERAÇÃO (06h–22h)',
                    color: 'black',
                    font: {
                        size: 32
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {

                            const inicio = context.raw.x[0];
                            const fim = context.raw.x[1];
                            const duracaoMinutos = context.raw.duracaoMinutos;

                            const horas = Math.floor(duracaoMinutos / 60);
                            const minutos = duracaoMinutos % 60;

                            return [
                                `${context.raw.y}`,
                                `Início: ${formatarHora(inicio)}`,
                                `Fim: ${formatarHora(fim)}`,
                                `Duração: ${horas}h ${minutos}min`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    min: 6,
                    max: 22,
                    ticks: {
                        stepSize: 1,
                        callback: value => value + ":00"
                    }
                },
                y: {
                    stacked: true
                }
            }
        }
    });
}

function obterPeriodoSelecionado() {
    const valor = periodo.value;

    if (valor == "24horas") {
        return "24 HOUR";
    } else if (valor == "7dias") {
        return "7 DAY";
    } else if (valor == "1mes") {
        return "1 MONTH";
    } else if (valor == "3meses") {
        return "3 MONTH";
    } else {
        return "6 MONTH";
    }
}

function formatarHora(horaDecimal) {
    const horas = Math.floor(horaDecimal);
    const minutos = Math.round((horaDecimal - horas) * 60);

    return `${horas}:${minutos < 10 ? '0' + minutos : minutos}`;
}
