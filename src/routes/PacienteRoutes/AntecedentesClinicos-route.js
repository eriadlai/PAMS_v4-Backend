const express = require("express");
const router = express.Router();
const oAntecedentesClinicos = require("../../controller/PacienteControllers/AntecedentesClinicos-controller");
const oMiddleware = require("../../../helpers/auth");

router.post(
  "/byid",
  oMiddleware.adminAuth,
  oAntecedentesClinicos.getOneAntecedentesClinicos
);
router.patch(
  "/update",
  oMiddleware.adminAuth,
  oAntecedentesClinicos.updateAntecedentesClinicos
);
module.exports = router;
