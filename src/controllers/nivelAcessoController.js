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

module.exports = {
    obterNiveisAcesso
}