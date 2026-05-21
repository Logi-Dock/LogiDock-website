// criando o objeto de rotas do Express
var router = express.Router();

// importando o controller responsável pela comunicação com a IA
var bobController = require("../controllers/bobController");

// rota para receber perguntas e gerar respostas
router.post("/perguntar", async (req, res) => {

    // capturando a pergunta enviada via JSON
    const pergunta = req.body.pergunta;

    try
    {
        // chamando a função do controller que envia a pergunta para o Gemini
        const resultado = await bobController.gerarResposta(pergunta); // await p/ aguardar resposta da IA
        
        res.json({ resultado }); // retorno da resposta via JSON pro front-end
    }
    
    // tratamento de erro
    catch (error)
    {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;