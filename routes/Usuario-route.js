const express = require("express");
const router = express.Router();
const oUsuarioController = require("../controller/Usuario-controller");

router.get("/all", oUsuarioController.getAllUsuarios);
router.get("/byid", oUsuarioController.getOneUsuario);
router.patch("/update", oUsuarioController.updateUsuario);
router.post("/insert", oUsuarioController.insertUsuario);

module.exports = router;
