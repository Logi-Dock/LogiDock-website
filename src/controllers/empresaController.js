var empresaModel = require("../models/empresaModel");

function IntegrarUsuarioNaEmpresa(req, res) {

    var fk_usuario = req.body.fk_usuarioServer;
    var fk_empresa = req.body.fk_empresaServer;

    empresaModel.IntegrarUsuarioNaEmpresa(fk_usuario, fk_empresa)
        .then(
            function(resultado) {
                res.json(resultado)
            }
        ).catch (
            function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function PegarIdEmpresa(req, res) {
    var codigo = req.params.codigo;

    empresaModel.PegarIdEmpresa(codigo)
    .then(
        function (resultado) {

            if (resultado.length == 1) {
            console.log(resultado);
            res.json({
                id_empresa: resultado[0].id_empresa,
            });

            } else if (resultado.length == 0) {
                res.status(403).send("codigo inválido");
            } else {
                res.status(403).send("Erro de duplicidade");
            } 
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}


module.exports = {
    IntegrarUsuarioNaEmpresa,
    PegarIdEmpresa
};
