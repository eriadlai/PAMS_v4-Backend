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
const oPacienteRoute = require("./routes/Paciente-route");
const oAntecedenteClinicoRoute = require("./routes/AntecedentesClinicos-route");
const oAntecedenteFamiliaresRoute = require("./routes/AntecedentesFamiliares-route");
const oCirculoSocialRoute = require("./routes/CirculoSocial-route");
const oProblematicaRoute = require("./routes/Problematica-route");
const oEstadoMentalRoute = require("./routes/EstadoMental-route");
const oHabitosRoute = require("./routes/Habitos-route");
const oHistorialSexualRoute = require("./routes/HistorialSexual-route");
const oCasaRoute = require("./routes/Casa-route");
/*
 * CONFIGURACION GENERAL
 */
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors({ credentials: false, origin: "*" }));
app.use("/usuario", oUsuarioRoute);
app.use("/roles", oRolesRoute);
app.use("/paciente", oPacienteRoute);
app.use("/antecedentesClinicos", oAntecedenteClinicoRoute);
app.use("/antecedentesFamiliares", oAntecedenteFamiliaresRoute);
app.use("/circuloSocial", oCirculoSocialRoute);
app.use("/problematica", oProblematicaRoute);
app.use("/estadoMental", oEstadoMentalRoute);
app.use("/habitos", oHabitosRoute);
app.use("/historialSexual", oHistorialSexualRoute);
app.use("/casa", oCasaRoute);
app.listen(port, () => console.log(`SERVIDOR ACTIVO EN PUERTO: ${port}`));
