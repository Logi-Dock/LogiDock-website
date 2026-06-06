var docaModel = require("../models/docaModel");

function cadastrarDocaESensor(req, res){
    var numero_doca = req.body.numeroDocaServer;
    var status_doca = req.body.statusDocaServer;
    var fk_empresa = req.body.fk_empresaServer;

    if (!numero_doca || !status_doca || !fk_empresa) {
        return res.status(400).send("Campos obrigatórios: numeroDocaServer, statusDocaServer, fk_empresaServer");
    }

    docaModel.cadastrarDocaESensor(numero_doca, status_doca, fk_empresa)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao cadastrar a doca! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}



function editarDoca(req, res){
    var id_doca = req.body.idDocaServer;
    var numero_doca = req.body.numeroDocaServer;
    var status_doca = req.body.statusDocaServer;
 
    if (!id_doca || !numero_doca || !status_doca) {
        return res.status(400).send("Campos obrigatórios: idDocaServer, numeroDocaServer, statusDocaServer");
    }

    docaModel.editarDoca(id_doca, numero_doca, status_doca)
    .then(function(resultado){
        res.json(resultado);
    })

    .catch(function (erro){
        console.log(erro);
        console.log("\nHouve um erro ao editar a doca! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })

}


function listarDoca(req, res){
    var fk_empresa = req.params.fk_empresa;

    docaModel.listarDocas(fk_empresa)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao listar as docas! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
    });
}

function obterDoca(req, res){
    var id_doca = req.params.id_doca;

    docaModel.obterDoca(id_doca)
    .then(function(resultado) {
        if (resultado.length === 0) {
            return res.status(404).send("Doca não encontrada.")
        }
        res.json(resultado[0]);
    })

    .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao obter a doca! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    cadastrarDocaESensor,
    editarDoca,
    listarDoca,
    obterDoca
}