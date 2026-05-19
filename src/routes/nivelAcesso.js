var express = require("express");
var router = express.Router();

var nivelAcessoController = require("../controllers/nivelAcessoController");

router.get("/", function (_req, res) {
    nivelAcessoController.obterNiveisAcesso(_req, res);
});

module.exports = router;