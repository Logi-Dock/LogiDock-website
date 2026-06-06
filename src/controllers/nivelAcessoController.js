const console = require("node:console");
var nivelAcessoModel = require("../models/nivelAcessoModel");

function obterNiveisAcesso(_req, res) {
    nivelAcessoModel.obterNiveisAcesso()
        .then(resultado => {
            res.json(resultado);
        }).catch(error => {
            console.log(error.message);
        });
}

function totalUsuarios(req, res) {
    var fk_empresa = req.params.fk_empresa;
    nivelAcessoModel.totalUsuarios(fk_empresa)
        .then(resultado => {
            res.json(resultado);
            console.log(res.json(resultado))
        }).catch(error => {
            console.log(error.message);
        });
}

module.exports = {
    obterNiveisAcesso,
    totalUsuarios
}