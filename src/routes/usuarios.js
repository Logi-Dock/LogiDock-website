var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

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