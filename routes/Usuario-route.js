const express = require("express");
const router = express.Router();
const oUsuarioController = require("../controller/Usuario-controller");

router.get("/all", oUsuarioController.getAllUsuarios);
router.post("/byid", oUsuarioController.getOneUsuario);
router.patch("/update", oUsuarioController.updateUsuario);
router.post("/insert", oUsuarioController.insertUsuario);
router.patch("/delete", oUsuarioController.deleteUsuario);
router.patch("/update/password", oUsuarioController.updatePassword);

module.exports = router;
