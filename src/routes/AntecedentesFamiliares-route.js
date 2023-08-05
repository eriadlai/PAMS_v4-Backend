const express = require("express");
const router = express.Router();
const oAntecedentesFamiliares = require("../controller/AntecedentesFamiliares-controller");
const oMiddleware = require("../helpers/auth");

router.post(
  "/byid",
  oMiddleware.adminAuth,
  oAntecedentesFamiliares.getOneAntecedentesFamiliares
);
router.patch(
  "/update",
  oMiddleware.adminAuth,
  oAntecedentesFamiliares.updateAntecedentesFamiliares
);
module.exports = router;
