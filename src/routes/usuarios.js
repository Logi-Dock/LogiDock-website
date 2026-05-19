var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/", function(req, res) {
    usuarioController.obterUsuario(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/CadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
})

router.get("/PegarIdUsuario/:email", function (req, res) {
    usuarioController.PegarIdUsuario(req, res);
});

module.exports = router;