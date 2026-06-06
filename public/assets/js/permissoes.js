let nivel_acesso = sessionStorage.NOME_NIVEL_ACESSO;

function verificarNivel()
{
    if (nivel_acesso == 'FUNCIONÁRIO')
    {
        // removendo página de edição de dados da empresa
        document.getElementById('empresa').remove();

        // removendo página de edição de dados dos funcionarios
        document.getElementById('funcionario').remove();

        // removendo elementos que envolvam cadastro de docas
        document.getElementById('doca-1').remove();
        document.getElementById('doca-2').remove();
    }

    if (nivel_acesso == 'GESTOR')
    {
        // removendo página de edição de dados dos funcionarios
        document.getElementById('funcionario').remove();

        // removendo página de edição de dados da empresa
        document.getElementById('empresa').remove();
    }
}
