const { oMongoDB } = require("../database");
const { ObjectId } = require("mongodb");
const oFunctions = require("../helpers/functions");

const getAllPacientes = async (req, res) => {
  const { oUserRol, oUserID } = req.body;
  let oCollection = await oMongoDB().collection("Paciente");
  let oQuery = { isActive: 1 };
  let oResult = await oCollection.find(oQuery, {}).limit(50).toArray();
  oFunctions.resetToken(oUserRol, oUserID);
  res.send(oResult).status(200);
};
const getOnePaciente = async (req, res) => {
  const { oID } = req.body;
  let oCollection = await oMongoDB().collection("Paciente");
  let oQuery = { _id: new ObjectId(oID), isActive: 1 };
  let oResult = await oCollection.findOne(oQuery);
  if (!oResult) res.send("NOT FOUND").status(404);
  else res.send(oResult).status(200);
};
const insertPaciente = async (req, res) => {
  const { oUserRol, oUserID } = req.body;
  let oCollection = await oMongoDB().collection("Paciente");
  let oNewPaciente = req.body;
  const oAspectoConsumoID = await oFunctions.setAspectoConsumo();
  delete oNewPaciente.oUserID;
  delete oNewPaciente.oUserRol;
  oNewPaciente.fechaRegistro = new Date().toJSON().slice(0, 10);
  oNewPaciente.noExpediente = (await oCollection.countDocuments()) + 1;
  oNewPaciente.AspectoConsumo = oAspectoConsumoID;
  let oResult = await oCollection.insertOne(oNewPaciente);
  oFunctions.resetToken(oUserRol, oUserID);
  res.send(oResult).status(204);
};
const updatePaciente = async (req, res) => {
  const {
    oID,
    nombre,
    apellido,
    fechaNacimiento,
    ocupacion,
    actividadExtra,
    direccion,
    telefono,
    estadoCivil,
    nivelEscolar,
    religion,
    oUserRol,
    oUserID,
  } = req.body;

  const oQuery = { _id: new ObjectId(oID) };
  const oUpdate = {
    $set: {
      nombre: nombre,
      apellido: apellido,
      fechaNacimiento: fechaNacimiento,
      ocupacion: ocupacion,
      actividadExtra: actividadExtra,
      direccion: direccion,
      telefono: telefono,
      estadoCivil: estadoCivil,
      nivelEscolar: nivelEscolar,
      religion: religion,
    },
  };
  let oCollection = await oMongoDB().collection("Paciente");
  let oResult = await oCollection.updateOne(oQuery, oUpdate);
  oFunctions.resetToken(oUserRol, oUserID);
  res.send(oResult).status(200);
};
const deletePaciente = async (req, res) => {
  const { oID, oUserRol, oUserID } = req.body;
  const oQuery = { _id: new ObjectId(oID) };
  const oUpdate = {
    $set: {
      isActive: 0,
    },
  };
  let oCollection = await oMongoDB().collection("Paciente");
  let oCollectionAspectosConsumo = await oMongoDB().collection(
    "AspectoConsumo"
  );
  let oAspectoID = await oCollection.findOne(oQuery);
  const oQueryAspecto = { _id: new ObjectId(oAspectoID.AspectoConsumo) };
  let oResult = await oCollection.updateOne(oQuery, oUpdate);
  let oResult2 = await oCollectionAspectosConsumo.updateOne(
    oQueryAspecto,
    oUpdate
  );
  console.log(oResult2);
  oFunctions.resetToken(oUserRol, oUserID);
  res.send(oResult).status(200);
};
module.exports = {
  getAllPacientes,
  getOnePaciente,
  insertPaciente,
  updatePaciente,
  deletePaciente,
};
