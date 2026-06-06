var express = require("express");
var router = express.Router();

var docaController = require("../controllers/docaController");


router.post("/cadastrar", function (req, res)
{
    docaController.cadastrarDocaESensor(req, res);
});


router.put("/editar", function (req, res)
{
    docaController.editarDoca(req, res);
});


router.get("/listar", function (req, res)
{
    docaController.listarDoca(req, res);
});


router.get("/:id_doca", function(req, res)
{
    docaController.obterDoca(req, res);
});


module.exports = router;