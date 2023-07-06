const express = require("express");
const router = express.Router();
const oRolesRoute = require("../controller/Roles-controller");

router.get("/all", oRolesRoute.getAllRoles);
router.patch("/update", oRolesRoute.updateRoles);
router.post("/insert", oRolesRoute.insertRoles);

module.exports = router;
