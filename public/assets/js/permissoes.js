let nivel_acesso = sessionStorage.NOME_NIVEL_ACESSO;

function verificarNivel()
{
    if (nivel_acesso == 'FUNCIONÁRIO')
    {
        // removendo página de edição de dados da empresa
        document.getElementById('navegador_empresa').remove();
        document.getElementById('navegador_bob_ia').remove();

        // removendo página de edição de dados dos funcionarios
        document.getElementById('funcionario').remove();

        // removendo elementos que envolvam cadastro de docas
        document.getElementById('doca-1').remove();
        document.getElementById('doca-2').remove();
    }

    if (nivel_acesso == 'GESTOR')
    {
        // removendo página de edição de dados dos funcionarios
        document.getElementById('navegador_funcionario').remove();
        document.getElementById('navegador_bob_ia').remove();

        // removendo página de edição de dados da empresa
        document.getElementById('navegador_empresa').remove();
    }

    if (nivel_acesso == 'ADMINISTRADOR') {
        document.getElementById('navegador_bob_ia').remove();
    }

    if (nivel_acesso == 'TÉCNICO') {
        document.getElementById('navegador_agora').remove();
        document.getElementById('navegador_alertas').remove();
        document.getElementById('navegador_docas').remove();
        document.getElementById('navegador_funcionario').remove();
        document.getElementById('navegador_empresa').remove();
    }
}
