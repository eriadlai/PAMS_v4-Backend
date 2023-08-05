const express = require("express");
const router = express.Router();
const oHistorialSexual = require("../../controller/PacienteControllers/HistorialSexual-controller");
const oMiddleware = require("../../helpers/auth");

router.post(
  "/byid",
  oMiddleware.adminAuth,
  oHistorialSexual.getHistorialSexual
);
router.patch(
  "/update",
  oMiddleware.adminAuth,
  oHistorialSexual.updateHistorialSexual
);
module.exports = router;
