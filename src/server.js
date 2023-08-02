/**
 * * IMPORTACION DE DEPENDENCIAS/PAQUETES
 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
/*
 * IMPORTACION DE RUTAS
 */
const oUsuarioRoute = require("./routes/Usuario-route");
const oRolesRoute = require("./routes/Roles-route");
/*
 * CONFIGURACION GENERAL
 */
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors({ credentials: false, origin: "*" }));
app.use("/usuario", oUsuarioRoute);
app.use("/roles", oRolesRoute);
app.listen(port, () => console.log(`SERVIDOR ACTIVO EN PUERTO: ${port}`));
