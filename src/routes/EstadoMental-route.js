const express = require("express");
const router = express.Router();
const oEstadoMental = require("../controller/EstadoMental-controller");
const oMiddleware = require("../helpers/auth");

router.post("/byid", oMiddleware.adminAuth, oEstadoMental.getEstadoMental);
router.patch(
  "/update",
  oMiddleware.adminAuth,
  oEstadoMental.updateEstadoMental
);
module.exports = router;
