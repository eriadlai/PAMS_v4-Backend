const express = require("express");
const router = express.Router();
const oCirculoSocialRoute = require("../../controller/PacienteControllers/CirculoSocial-controller");
const oMiddleware = require("../../helpers/auth");

router.post(
  "/byid",
  oMiddleware.adminAuth,
  oCirculoSocialRoute.getOneCirculoSocial
);
router.patch(
  "/update",
  oMiddleware.adminAuth,
  oCirculoSocialRoute.updateCirculoSocial
);
module.exports = router;
