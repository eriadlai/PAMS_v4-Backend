const express = require("express");
const router = express.Router();
const oProblematicaController = require("../../controller/PacienteControllers/Problematica-controller");
const oMiddleware = require("../../helpers/auth");

router.post(
  "/byid",
  oMiddleware.adminAuth,
  oProblematicaController.getProblematica
);
router.patch(
  "/update",
  oMiddleware.adminAuth,
  oProblematicaController.updateProblematica
);
module.exports = router;
