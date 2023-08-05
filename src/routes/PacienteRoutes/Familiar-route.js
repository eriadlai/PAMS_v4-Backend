const express = require("express");
const router = express.Router();
const oFamiliar = require("../../controller/PacienteControllers/Familiar-controller");
const oMiddleware = require("../../helpers/auth");

router.post("/byid", oMiddleware.adminAuth, oFamiliar.getFamiliar);
router.patch("/update", oMiddleware.adminAuth, oFamiliar.updateFamiliar);
module.exports = router;
