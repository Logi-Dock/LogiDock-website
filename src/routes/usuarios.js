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
});

router.put("/atualizarNome", function (req, res) {
    usuarioController.atualizarNome(req, res);
});

router.put("/atualizarEmail", function (req, res) {
    usuarioController.atualizarEmail(req, res);
});

router.put("/atualizarNivelAcesso", function (req, res) {
    usuarioController.atualizarNivelAcesso(req, res);
});

router.put("/atualizarSenha", function (req, res) {
    usuarioController.atualizarSenha(req, res);
});

router.post("/verificarSenha", function (req, res) {
    usuarioController.verificarSenha(req, res);
});

router.get("/PegarIdUsuario/:email", function (req, res) {
    usuarioController.PegarIdUsuario(req, res);
});

router.get("/listarUsuarios/:fk_empresa", function(req,res){
usuarioController.listarUsuarios(req,res);
});

router.delete("/excluirUsuario/:id", function(req, res) {
usuarioController.excluirUsuario(req, res);
});

router.put("/editarUsuario/:id", function(req, res) {
usuarioController.editarUsuario(req, res);
});


module.exports = router;