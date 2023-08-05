const express = require("express");
const router = express.Router();
const oCasa = require("../../controller/PacienteControllers/Casa-controller");
const oMiddleware = require("../../helpers/auth");

router.post("/byid", oMiddleware.adminAuth, oCasa.getCasa);
router.patch("/update", oMiddleware.adminAuth, oCasa.updateCasa);
module.exports = router;
