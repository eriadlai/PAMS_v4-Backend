const express = require("express");
const router = express.Router();
const oAspectoConsumo = require("../../controller/AspectoConsumoControllers/AspectoConsumo-controller");
const oMiddleware = require("../../helpers/auth");

router.post(
  "/byid",
  oMiddleware.adminAuth,
  oAspectoConsumo.getOneAspectoConsumo
);
router.patch(
  "/update",
  oMiddleware.adminAuth,
  oAspectoConsumo.updateAspectoConsumo
);
module.exports = router;
