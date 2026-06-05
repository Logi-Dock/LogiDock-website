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

router.get("/vizualizarDadosEmpresa/:fk_empresa", function (req,res) {
    empresaController.vizualizarDadosEmpresa(req, res);
})

router.post("/alterarDadosEmpresa", function (req,res) {
    empresaController.alterarDadosEmpresa(req, res);
})

router.post("/alterarEnderecoEmpresa", function (req,res) {
    empresaController.alterarEnderecoEmpresa(req, res);
})

module.exports = router;