var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.post("/IntegrarUsuarioNaEmpresa", function (req, res) {
    empresaController.IntegrarUsuarioNaEmpresa(req, res);
})

router.get("/PegarIdEmpresa/:codigo", function (req, res) {
    empresaController.PegarIdEmpresa(req, res);
});

router.get("/PegarAvisos/:fk_empresa", function (req,res) {
    empresaController.PegarAvisos(req, res);
})

router.get("/vizualizar-dados-empresa/:fk_empresa", function (req,res) {
    empresaController.vizualizarDadosEmpresa(req, res);
})

module.exports = router;