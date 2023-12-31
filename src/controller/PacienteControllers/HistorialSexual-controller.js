const { oMongoDB } = require("../../database");
const { ObjectId } = require("mongodb");
const oFunctions = require("../../helpers/functions");
const oRegistros = require("../../helpers/actionsLog");
const getHistorialSexual = async (req, res) => {
  const { oID, oUserRol, oUserID } = req.body;
  let oCollection = await oMongoDB().collection("Paciente");
  let oQuery = { _id: new ObjectId(oID), isActive: 1 };
  let oResult = await oCollection.findOne(oQuery, {
    projection: {
      HistorialSexual: 1,
    },
  });
  oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.GET_HISTORIAL_SEXUAL);
  if (!oResult) res.send("NOT FOUND").status(404);
  else res.send(oResult).status(200);
};
const updateHistorialSexual = async (req, res) => {
  const { oID, oUserRol, oUserID, HistorialSexual } = req.body;
  const oQuery = { _id: new ObjectId(oID) };
  const oUpdate = {
    $set: {
      HistorialSexual: HistorialSexual,
    },
  };
  let oCollection = await oMongoDB().collection("Paciente");
  let oResult = await oCollection.updateOne(oQuery, oUpdate);
  oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.UPDATE_HISTORIAL_SEXUAL);
  res.send(oResult).status(200);
};
module.exports = {
  getHistorialSexual,
  updateHistorialSexual,
};
