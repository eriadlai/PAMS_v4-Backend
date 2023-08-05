const express = require("express");
const router = express.Router();
const oPacienteController = require("../../controller/PacienteControllers/Paciente-controller");
const oMiddleware = require("../../helpers/auth");

router.post("/all", oMiddleware.adminAuth, oPacienteController.getAllPacientes);
router.post("/byid", oMiddleware.adminAuth, oPacienteController.getOnePaciente);
router.post(
  "/insert",
  oMiddleware.adminAuth,
  oPacienteController.insertPaciente
);
router.patch(
  "/update",
  oMiddleware.adminAuth,
  oPacienteController.updatePaciente
);
router.patch(
  "/delete",
  oMiddleware.adminAuth,
  oPacienteController.deletePaciente
);
module.exports = router;
