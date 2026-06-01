var usuarioModel = require("../models/usuarioModel");

function atualizarNome(req, res) {
    var id_usuario = req.body.idUsuarioServer;
    var nome_usuario = req.body.nomeServer;

    usuarioModel.atualizarNome(id_usuario, nome_usuario)
        .then(resultado => {
            res.json(resultado);
        }).catch(error => {
            console.log(error);
            res.status(500).json(error.message);
        });
}

function atualizarEmail(req, res) {
    var id_usuario = req.body.idUsuarioServer;
    var email_usuario = req.body.emailServer;

    usuarioModel.atualizarEmail(id_usuario, email_usuario)
        .then(resultado => {
            res.json(resultado);
        }).catch(error => {
            console.log(error);
            res.status(500).json(error.message);
        });
}

function atualizarNivelAcesso(req, res) {
    var id_usuario = req.body.idUsuarioServer;
    var nivel_acesso = req.body.nivelAcessoServer;

    usuarioModel.atualizarNivelAcesso(id_usuario, nivel_acesso)
        .then(resultado => {
            res.json(resultado);
        }).catch(error => {
            console.log(error);
            res.status(500).json(error.message);
        });
}

function atualizarSenha(req, res) {
    var id_usuario = req.body.idUsuarioServer;
    var senha_usuario = req.body.senhaServer;

    usuarioModel.atualizarSenha(id_usuario, senha_usuario)
        .then(resultado => {
            res.json(resultado);
        }).catch(error => {
            console.log(error);
            res.status(500).json(error.message);
        });
}

function verificarSenha(req, res) {
    var id_usuario = req.body.idUsuarioServer;
    var senha = req.body.senhaServer;

    usuarioModel.verificarSenha(id_usuario, senha)
        .then(resultado => {
            res.json(resultado)
        }).catch(error => {
            console.log(error);
            res.status(500).json(error.message);
        });
}

function obterUsuario(req, res) {
    var id_usuario = req.body.idUsuarioServer;

    usuarioModel.obterUsuario(id_usuario)
        .then(resultado => {
            res.json(resultado);
        }).catch(error => {
            console.log(error);
            res.status(500).json(error.message);
        });
}

function autenticar(req, res) {
    var email_user = req.body.emailServer;
    var senha_user = req.body.senhaServer;

    if (email_user == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha_user == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email_user, senha_user)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            id_usuario: resultadoAutenticar[0].id_usuario,
                            email_user: resultadoAutenticar[0].email_user,
                            nome_user: resultadoAutenticar[0].nome_user,
                            senha_user: resultadoAutenticar[0].senha_user,
                            razao_social: resultadoAutenticar[0].razao_social,
                            nome_nivel_acesso: resultadoAutenticar[0].nome_nivel_acesso,
                            fk_empresa: resultadoAutenticar[0].fk_empresa
                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
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

}


function cadastrarUsuario(req, res) {

    var nome_user = req.body.nomeServer;
    var email_user = req.body.emailServer;
    var senha_user = req.body.senhaServer;
    var fk_empresa = req.body.fk_empresaServer;
    var fk_nivel_acesso = req.body.fk_nivel_acessoServer;

    usuarioModel.cadastrarUsuario(nome_user, email_user, senha_user, fk_empresa, fk_nivel_acesso)
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
    obterUsuario,
    autenticar,
    cadastrarUsuario,
    atualizarNome,
    atualizarEmail,
    atualizarNivelAcesso,
    atualizarSenha,
    verificarSenha,
    PegarIdUsuario
};
