const express = require("express");
const router = express.Router();
const oCitaController = require("../controller/Cita-controller");
const oMiddleware = require("../helpers/auth");
router.post("/all", oMiddleware.adminAuth, oCitaController.getAllCita);
router.post("/byid", oMiddleware.adminAuth, oCitaController.getOneCita);
router.post(
  "/byPacienteId",
  oMiddleware.adminAuth,
  oCitaController.getCitaByPacienteId
);
router.post(
  "/citareporte/byPacienteId",
  oMiddleware.adminAuth,
  oCitaController.getCitaReporteByPacienteId
);
router.patch("/update", oMiddleware.adminAuth, oCitaController.updateCita);
router.patch(
  "/update/estado",
  oMiddleware.adminAuth,
  oCitaController.updateEstadoCita
);
router.post("/insert", oMiddleware.adminAuth, oCitaController.insertCita);
module.exports = router;
