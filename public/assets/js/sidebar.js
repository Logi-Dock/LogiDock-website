nome.innerHTML = `${sessionStorage.NOME_USUARIO}`;
FakeFoto.innerHTML = `${(sessionStorage.NOME_USUARIO)[0]}`;
let espaco = (sessionStorage.NOME_USUARIO).indexOf(' ');
FakeFoto.innerHTML += `${(sessionStorage.NOME_USUARIO)[espaco + 1]}`;
empresaUser.innerHTML = `${sessionStorage.RAZAO_SOCIAL}`;
permissao.innerHTML = `${sessionStorage.NOME_NIVEL_ACESSO}`;
