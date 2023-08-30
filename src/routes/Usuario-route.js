const express = require("express");
const router = express.Router();
const oUsuarioController = require("../controller/Usuario-controller");
const oMiddleware = require("../helpers/auth");
router.post("/all", oMiddleware.adminAuth, oUsuarioController.getAllUsuarios);
router.post("/byid", oMiddleware.adminAuth, oUsuarioController.getOneUsuario);
router.patch(
  "/update",
  oMiddleware.adminAuth,
  oUsuarioController.updateUsuario
);
router.post("/insert", oMiddleware.adminAuth, oUsuarioController.insertUsuario);
router.patch(
  "/delete",
  oMiddleware.adminAuth,
  oUsuarioController.deleteUsuario
);
router.patch(
  "/update/password",
  oMiddleware.adminAuth,
  oUsuarioController.updatePassword
);
router.post("/login", oUsuarioController.getLogin);
router.post("/token/byid", oUsuarioController.getTokenByID);
module.exports = router;
