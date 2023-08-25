const { ObjectId } = require("mongodb");
const { oMongoDB } = require("../database");
const oFunctions = require("../helpers/functions");
const oRegistros = require("../helpers/actionsLog");

const getAllCita = async (req, res) => {
  const { oUserRol, oUserID } = req.body;
  let oCollection = await oMongoDB().collection("Cita");
  let oQuery = { isActive: 1 };
  let oResult = await oCollection
    .find(oQuery, {
      projection: {
        isActive: 0,
        ReporteSesion: 0,
      },
    })
    .limit(50)
    .toArray();
  if (oResult.length === 0) {
    return res.send("NO EXISTEN DATOS").status(200);
  }
  console.log(oResult, "==========");
  let oCollectionPaciente = await oMongoDB().collection("Paciente");
  let oQueryPaciente = { _id: new ObjectId(oResult.Paciente), isActive: 1 };
  let oResultPaciente = await oCollectionPaciente.findOne(oQueryPaciente, {
    projection: {
      nombre: 1,
      apellido: 1,
    },
  });
  oResult.Paciente = oResultPaciente.nombre + " " + oResultPaciente.apellido;
  let oCollectionUsuario = await oMongoDB().collection("Usuario");
  let oQueryUsuario = { _id: new ObjectId(oResult.Usuario), isActive: 1 };
  let oResultUsuario = await oCollectionUsuario.findOne(oQueryUsuario, {
    projection: {
      nombre: 1,
      apellido: 1,
    },
  });
  oResult.Usuario = oResultUsuario.nombre + " " + oResultUsuario.apellido;
  oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.GET_CITAS);
  res.send(oResult).status(200);
};
const getOneCita = async (req, res) => {
  const { oID, oUserRol, oUserID } = req.body;
  let oCollection = await oMongoDB().collection("Cita");
  let oQuery = { _id: new ObjectId(oID), isActive: 1 };
  let oResult = await oCollection.findOne(oQuery, {
    projection: {
      isActive: 0,
      Paciente: 0,
      Usuario: 0,
    },
  });
  if (oResult.length === 0) {
    return res.send("NOT FOUND").status(404);
  }
  let oCollectionReporteSesion = await oMongoDB().collection("ReporteSesion");
  let oQueryReporteSesion = {
    _id: new ObjectId(oResult.ReporteSesion),
    isActive: 1,
  };
  oResult.ReporteSesion = await oCollectionReporteSesion.findOne(
    oQueryReporteSesion,
    {
      projection: {
        isActive: 0,
      },
    }
  );
  oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.GET_ONE_CITA);
  if (!oResult) res.send("NOT FOUND").status(404);
  else res.send(oResult).status(200);
};
const getCitaByPacienteId = async (req, res) => {
  const { oID, oUserRol, oUserID } = req.body;
  let oCollection = await oMongoDB().collection("Cita");
  let oQuery = { Paciente: new ObjectId(oID), isActive: 1 };
  let oResult = await oCollection.find(oQuery, {
    projection: {
      isActive: 0,
      Paciente: 0,
    },
  });
  if (oResult.length === 0) {
    return res.send("NOT FOUND").status(404);
  }
  let oCollectionUsuario = await oMongoDB().collection("Usuario");
  let oQueryUsuario = { _id: new ObjectId(oResult.Usuario), isActive: 1 };
  let oResultUsuario = await oCollectionUsuario.findOne(oQueryUsuario, {
    projection: {
      nombre: 1,
      apellido: 1,
    },
  });
  oResult.Usuario = oResultUsuario.nombre + " " + oResultUsuario.apellido;
  oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.GET_CITA_BY_PACIENTE);
  if (!oResult) res.send("NOT FOUND").status(404);
  else res.send(oResult).status(200);
};
const getCitaReporteByPacienteId = async (req, res) => {
  const { oID, oUserRol, oUserID } = req.body;
  let oCollection = await oMongoDB().collection("Cita");
  let oQuery = { Paciente: new ObjectId(oID), isActive: 1 };
  let oResult = await oCollection.find(oQuery, {
    projection: {
      isActive: 0,
    },
  });
  if (oResult.length === 0) {
    return res.send("NOT FOUND").status(404);
  }
  let oCollectionReporteSesion = await oMongoDB().collection("ReporteSesion");
  let oQueryReporteSesion = {
    _id: new ObjectId(oResult.ReporteSesion),
    isActive: 1,
  };
  oResult.ReporteSesion = await oCollectionReporteSesion.findOne(
    oQueryReporteSesion,
    {
      projection: {
        isActive: 0,
      },
    }
  );
  oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.GET_CITA_BY_PACIENTE);
  if (!oResult) res.send("NOT FOUND").status(404);
  else res.send(oResult).status(200);
};
const insertCita = async (req, res) => {
  const { oUserRol, oUserID } = req.body;
  let oCollection = await oMongoDB().collection("Cita");
  let oNewCita = req.body;
  oNewCita.ReporteUsuario = await oFunctions.setReporteSesion();
  let oResult = await oCollection.insertOne(oNewCita);
  oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.INSERT_CITA);
  res.send(oResult).status(204);
};
const updateCita = async (req, res) => {
  const { oID, oUserRol, oUserID, fecha, asunto, estado } = req.body;
  const oQuery = { _id: ObjectId(oID) };
  const oUpdate = {
    $set: {
      fecha: fecha,
      asunto: asunto,
      estado: estado,
    },
  };
  let oCollection = await oMongoDB().collection("Cita");
  let oResult = await oCollection.updateOne(oQuery, oUpdate);
  oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.UPDATE_CITA);
  res.send(oResult).status(200);
};
const updateEstadoCita = async (req, res) => {
  const { oID, oUserRol, oUserID, estado } = req.body;
  const oQuery = { _id: ObjectId(oID) };
  const oUpdate = {
    $set: {
      estado: estado,
    },
  };
  let oCollection = await oMongoDB().collection("Cita");
  let oResult = await oCollection.updateOne(oQuery, oUpdate);
  oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.UPDATE_ESTADO_CITA);
  res.send(oResult).status(200);
};
module.exports = {
  getAllCita,
  insertCita,
  updateCita,
  getOneCita,
  getCitaByPacienteId,
  updateEstadoCita,
  getCitaReporteByPacienteId,
};
