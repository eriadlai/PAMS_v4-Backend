const { oMongoDB } = require("../../database");
const { ObjectId } = require("mongodb");
const oFunctions = require("../../helpers/functions");
const oRegistros = require("../../helpers/actionsLog");

const getHabitos = async (req, res) => {
  const { oID, oUserRol, oUserID } = req.body;
  let oCollection = await oMongoDB().collection("Paciente");
  let oQuery = { _id: new ObjectId(oID), isActive: 1 };
  let oResult = await oCollection.findOne(oQuery, {
    projection: {
      Habitos: 1,
    },
  });
  oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.GET_HABITOS);
  if (!oResult) res.send("NOT FOUND").status(404);
  else res.send(oResult).status(200);
};
const updateHabitos = async (req, res) => {
  const { oID, oUserRol, oUserID, Habitos } = req.body;
  const oQuery = { _id: new ObjectId(oID) };
  const oUpdate = {
    $set: {
      Habitos: Habitos,
    },
  };
  let oCollection = await oMongoDB().collection("Paciente");
  let oResult = await oCollection.updateOne(oQuery, oUpdate);
  oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.UPDATE_HABITOS);
  res.send(oResult).status(200);
};
module.exports = {
  getHabitos,
  updateHabitos,
};
