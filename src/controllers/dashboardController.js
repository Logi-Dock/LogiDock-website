var dashboardModel = require("../models/dashboardModel");

function kpiDocaMaisAtrasos(req, res) {
    var fk_empresa = req.params.fk_empresa;
    var periodo = req.params.periodo;
    
    dashboardModel.kpiDocaMaisAtrasos(fk_empresa, periodo)
    .then(
        function(resultado) {
            res.json(resultado)
        }
    ).catch (
            function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function kpiDocaMaiorAtrasoNoMomento(req, res) {
    var fk_empresa = req.params.fk_empresa;
    var periodo = req.params.periodo;
    
    dashboardModel.kpiDocaMaiorAtrasoNoMomento(fk_empresa, periodo)
    .then(
        function(resultado) {
            res.json(resultado)
        }
    ).catch (
            function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function kpiDocaMaiorTaxaDeAtrasos(req, res) {
    var fk_empresa = req.params.fk_empresa;
    var periodo = req.params.periodo;
    
    dashboardModel.kpiDocaMaiorTaxaDeAtrasos(fk_empresa, periodo)
    .then(
        function(resultado) {
            res.json(resultado)
        }
    ).catch (
            function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function kpiDocaMaiorTempoDeAtrasoAcumulado(req, res) {
    var fk_empresa = req.params.fk_empresa;
    var periodo = req.params.periodo;
    
    dashboardModel.kpiDocaMaiorTempoDeAtrasoAcumulado(fk_empresa, periodo)
    .then(
        function(resultado) {
            res.json(resultado)
        }
    ).catch (
            function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function graficoTempoMedioPorDoca(req, res) {
    var fk_empresa = req.params.fk_empresa;
    const limite_linhas = 10; // numero de docas que vai aparecer no gráfico
    
    dashboardModel.graficoTempoMedioPorDoca(fk_empresa, limite_linhas)
    .then(
        function(resultado) {
            res.json(resultado)
        }
    ).catch (
            function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function graficoDocasComMaisAtrasos(req, res) {
    var fk_empresa = req.params.fk_empresa;
    
    dashboardModel.graficoDocasComMaisAtrasos(fk_empresa)
    .then(
        function(resultado) {
            res.json(resultado)
        }
    ).catch (
            function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function graficoTempoDePermanenciaPorOperacao(req, res) {
    var fk_empresa = req.params.fk_empresa;
    const limite_linhas = 10; // numero de docas que vai aparecer no gráfico
    
    dashboardModel.graficoTempoDePermanenciaPorOperacao(fk_empresa, limite_linhas)
    .then(
        function(resultado) {
            res.json(resultado)
        }
    ).catch (
            function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}


module.exports = {
    kpiDocaMaisAtrasos,
    kpiDocaMaiorAtrasoNoMomento,
    kpiDocaMaiorTaxaDeAtrasos,
    kpiDocaMaiorTempoDeAtrasoAcumulado,

    graficoTempoMedioPorDoca,
    graficoDocasComMaisAtrasos,
    graficoTempoDePermanenciaPorOperacao
};
