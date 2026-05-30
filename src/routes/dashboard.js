var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/kpiDocaMaisAtrasos/:fk_empresa/:periodo", function (req, res)
{
    dashboardController.kpiDocaMaisAtrasos(req, res);
})

router.get("/kpiDocaMaiorAtrasoNoMomento/:fk_empresa", function (req, res)
{
    dashboardController.kpiDocaMaiorAtrasoNoMomento(req, res);
})

router.get("/kpiDocaMaiorTaxaDeAtrasos/:fk_empresa", function (req, res)
{
    dashboardController.kpiDocaMaiorTaxaDeAtrasos(req, res);
})

router.get("/kpiDocaMaiorTempoDeAtrasoAcumulado/:fk_empresa", function (req, res)
{
    dashboardController.kpiDocaMaiorTempoDeAtrasoAcumulado(req, res);
})

router.get("/graficoTempoMedioPorDoca/:fk_empresa", function (req, res)
{
    dashboardController.graficoTempoMedioPorDoca(req, res);
})

router.get("/graficoDocasComMaisAtrasos/:fk_empresa", function (req, res)
{
    dashboardController.graficoDocasComMaisAtrasos(req, res);
})

router.get("/graficoTempoDePermanenciaPorOperacao/:fk_empresa", function (req, res)
{
    dashboardController.graficoTempoDePermanenciaPorOperacao(req, res);
})

module.exports = router;