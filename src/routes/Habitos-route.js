const express = require("express");
const router = express.Router();
const oHabitos = require("../controller/Habitos-controller");
const oMiddleware = require("../helpers/auth");

router.post("/byid", oMiddleware.adminAuth, oHabitos.getHabitos);
router.patch("/update", oMiddleware.adminAuth, oHabitos.updateHabitos);
module.exports = router;
