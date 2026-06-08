var express = require("express");
var router = express.Router();

var docaController = require("../controllers/docaController");


router.post("/cadastrarDocaESensor", function (req, res)
{
    docaController.cadastrarDocaESensor(req, res);
});


router.put("/editarDoca", function (req, res)
{
    docaController.editarDoca(req, res);
});


router.get("/listarDoca/fk_empresa", function (req, res)
{
    docaController.listarDoca(req, res);
});


router.get("/obterDoca/:id_doca", function(req, res)
{
    docaController.obterDoca(req, res);
});


module.exports = router;