let dados_recebidos;
const idUsuarioLogado = sessionStorage.getItem("ID_USUARIO");

function obterUsuario() {
    fetch("/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuarioLogado,
        })
    }).then(response => response.json())
        .then(data => {
            preencherDadosUsuario(data);
            dados_recebidos = data;
        })
}

function verificarSenhaAtual(idUsuario, senhaAtual) {
    return fetch("/usuarios/verificarSenha", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuario,
            senhaServer: senhaAtual
        })
    })
        .then(response => response.json())
        .then(data => {
            return data.length > 0;
        });
}

function preencherDadosUsuario(data) {
    let nome = document.getElementById("nome");

    empresaUser.innerHTML = data[0].razao_social;
    nome.innerHTML = data[0].nome_user;
    permissao.innerHTML = data[0].nome_nivel_acesso;
    dados_usuario_nome.innerHTML = data[0].nome_user;
    email_usuario.innerHTML = data[0].email_user;
    empresa_usuario.innerHTML = data[0].razao_social;
    nivel_usuario.innerHTML = data[0].nome_nivel_acesso;
    FakeFotoUser.innerHTML = data[0].nome_user[0];
    let espaco = data[0].nome_user.indexOf(' ');
    FakeFotoUser.innerHTML += data[0].nome_user[espaco + 1];
    ipt_nome.value = data[0].nome_user;
    ipt_email.value = data[0].email_user;
}

function obterNiveisAcesso() {
    fetch("/nivelAcesso")
        .then(response => response.json())
        .then(data => {
            preencherNiveisAcesso(data);
        })
}

function preencherNiveisAcesso(data) {
    const options = document.querySelector(".grupo_campo_niveis_acesso");

    for (let i = 0; i < data.length; i++) {
        const elemento = data[i];

        options.innerHTML +=
        `
            <option value="${elemento.id_nivel_acesso}">${elemento.nome_nivel_acesso}</option>
        `

        options.value = dados_recebidos[0].fk_nivel_acesso;
    }
}

const nome = document.getElementById("ipt_nome");
const email = document.getElementById("ipt_email");
const nivel = document.querySelector(".grupo_campo_niveis_acesso");
const senha = document.getElementById("senha_user");
const novaSenha = document.getElementById("nova_senha");
const confirmarSenha = document.getElementById("confirmar_senha");

const btnEditar = document.getElementById("btn_editar");
const btnSalvar = document.getElementById("btn_salvar");
const btnCancelar = document.getElementById("btn_cancelar");
const btnAtualizarSenha = document.getElementById("btn_atualizar");

function habilitarEdicao() {
    nome.disabled = false;
    email.disabled = false;
    nivel.disabled = false;

    btnEditar.classList.add("hide");
    btnSalvar.classList.remove("hide");
    btnCancelar.classList.remove("hide");
}

function cancelarEdicao() {
    nome.value = dados_recebidos[0].nome_user;
    email.value = dados_recebidos[0].email_user;
    nivel.value = dados_recebidos[0].fk_nivel_acesso;

    nome.disabled = true;
    email.disabled = true;
    nivel.disabled = true;

    btnEditar.classList.remove("hide");
    btnSalvar.classList.add("hide");
    btnCancelar.classList.add("hide");
}

function cancelarSenha() {
    senha.value = "";
    novaSenha.value = "";
    confirmarSenha.value = "";
}

function atualizarDados() {
    const nomeVar = nome.value.trim();
    const emailVar = email.value.trim();
    const nivelAcessoVar = nivel.value;

    if (nomeVar == "") {
        alert("O nome não pode ficar vazio!");
        return;
    }

    if (emailVar == "") {
        alert("O email não pode ficar vazio!");
        return;
    }

    if (!emailVar.includes("@") || !emailVar.includes(".")) {
        alert("Digite um email válido!");
        return;
    }

    if (nivelAcessoVar == "") {
        alert("Selecione um nível de acesso!");
        return;
    }

    fetch("/usuarios/atualizarNome", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuarioLogado,
            nomeServer: nomeVar
        })
    });

    fetch("/usuarios/atualizarEmail", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuarioLogado,
            emailServer: emailVar
        })
    });

    fetch("/usuarios/atualizarNivelAcesso", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuarioLogado,
            nivelAcessoServer: nivelAcessoVar
        })
    })
        .then(resposta => {

            if (resposta.ok) {

                sessionStorage.NOME_USUARIO = nomeVar;
                sessionStorage.EMAIL_USUARIO = emailVar;
                sessionStorage.NOME_NIVEL_ACESSO = nivel.options[nivel.selectedIndex].text;

                alert("Dados atualizados com sucesso!");
                window.location.reload();
            } else {

                alert("Erro ao atualizar os dados!");

            }

        })
        .catch(erro => {
            console.log(erro);
        });

};

function atualizarSenha() {
    const senhaVar = senha.value.trim();
    const novaSenhaVar = novaSenha.value.trim();
    const confirmarSenhaVar = confirmarSenha.value.trim();

    if (senhaVar == "") {
        alert("A senha não pode ficar vazia!");
        return;
    }

    if (novaSenhaVar == "") {
        alert("A nova senha não pode ficar vazia!");
        return;
    }

    if (confirmarSenhaVar == "") {
        alert("Confirmar senha não pode ficar vazio");
        return;
    }

    if (novaSenhaVar != confirmarSenhaVar) {
        alert("As senhas não podem ser diferentes");
        return;
    }

    verificarSenhaAtual(idUsuarioLogado, senhaVar)
        .then(senhaValida => {

            if (!senhaValida) {
                alert("Senha atual incorreta");
                return;
            }

            console.log("Senha correta");

            fetch("/usuarios/atualizarSenha", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idUsuarioServer: idUsuarioLogado,
                    senhaServer: novaSenhaVar
                })
            }).then(resultado => {
                if (resultado.ok) {
                    alert("Senha atualizada com sucesso!");
                    window.location.reload();
                }
                else alert("Erro ao atualizar senha!");
            }).catch(erro => {
                console.log(erro);
            })
        });
}

obterUsuario();
obterNiveisAcesso();
