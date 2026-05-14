var usuarioModel = require("../models/usuarioModel");

function cadastrarUsuario(req, res) {

    var nome_user = req.body.nomeServer;
    var email_user = req.body.emailServer;
    var senha_user = req.body.senhaServer;

    usuarioModel.cadastrarUsuario(nome_user, email_user, senha_user)
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

function PegarIdUsuario(req, res) {
    var email_user = req.params.email;

    usuarioModel.PegarIdUsuario(email_user)
    .then(
        function (resultado) {

            if (resultado.length == 1) {
            console.log(resultado);
            res.json({
                id_usuario: resultado[0].id_usuario,
            });

            } else if (resultado.length == 0) {
                res.status(403).send("Email inválido");
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
    cadastrarUsuario,
    PegarIdUsuario
};
