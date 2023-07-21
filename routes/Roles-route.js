const express = require("express");
const router = express.Router();
const oRolesRoute = require("../controller/Roles-controller");
const oMiddleware = require("../helpers/auth");

router.get("/all", oMiddleware.adminAuth, oRolesRoute.getAllRoles);
router.patch("/update", oMiddleware.adminAuth, oRolesRoute.updateRoles);
router.post("/insert", oMiddleware.adminAuth, oRolesRoute.insertRoles);

module.exports = router;
