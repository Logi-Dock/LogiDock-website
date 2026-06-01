// importando a SDK oficial do Gemini para comunicação com a IA
const { GoogleGenAI } = require("@google/genai");

// criando a instância da IA utilizando a chave salva no arquivo .env
const chatIA = new GoogleGenAI({ apiKey: process.env.MINHA_CHAVE });

// função para gerar respostas usando o gemini
async function gerarResposta(mensagem)
{
    try
    {
        // gerando conteúdo com base na pergunta
        const modeloIA = chatIA.models.generateContent(
        {
            model: "gemini-2.5-flash",

            // prompt enviado para a IA
            contents: `Em um paragráfo responda: ${mensagem}`
        });

        // aguardando a resposta da API
        const resposta = (await modeloIA).text; // .text pra receber somente texto

        const tokens = (await modeloIA).usageMetadata; // consumo de tokens a cada prompt

        console.log(resposta);
        console.log("Uso de Tokens:", tokens);

        return resposta;
    }
    
    // Tratamento de erro
    catch (error)
    {
        console.error(error);
        throw error;
    }
}

module.exports =
{
    gerarResposta
};