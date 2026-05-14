var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.post("/IntegrarUsuarioNaEmpresa", function (req, res) {
    empresaController.IntegrarUsuarioNaEmpresa(req, res);
})

router.get("/PegarIdEmpresa/:codigo", function (req, res) {
    empresaController.PegarIdEmpresa(req, res);
});

module.exports = router;