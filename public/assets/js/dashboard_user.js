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
        })
}

function preencherDadosUsuario(data) {
    empresaUser.innerHTML = data[0].razao_social;
    nome.innerHTML = data[0].nome_user;
    permissao.innerHTML = data[0].nome_nivel_acesso;
    dados_usuario_nome.innerHTML = data[0].nome_user;
    email_usuario.innerHTML = data[0].email_user;
    empresa_usuario.innerHTML = data[0].razao_social;
    nivel_usuario.innerHTML = data[0].nome_nivel_acesso;
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

        console.log(options);
        options.innerHTML +=
            `
            <option>${elemento.nome_nivel_acesso}</option>
        `
    }
}

const nome = document.getElementById("ipt_nome");
const email = document.getElementById("ipt_email");
const nivel = document.querySelector(".grupo_campo_niveis_acesso");

const btnEditar = document.getElementById("btn_editar");
const btnSalvar = document.getElementById("btn_salvar");
const btnCancelar = document.getElementById("btn_cancelar");

btnEditar.addEventListener("click", habilitarEdicao);
btnCancelar.addEventListener("click", cancelarEdicao);

function habilitarEdicao() {
    nome.disabled = false;
    email.disabled = false;
    nivel.disabled = false;

    btnEditar.classList.add("hide");
    btnSalvar.classList.remove("hide");
    btnCancelar.classList.remove("hide");
}

function cancelarEdicao() {
    nome.disabled = true;
    email.disabled = true;
    nivel.disabled = true;

    btnEditar.classList.remove("hide");
    btnSalvar.classList.add("hide");
    btnCancelar.classList.add("hide");
}

obterUsuario();
obterNiveisAcesso();