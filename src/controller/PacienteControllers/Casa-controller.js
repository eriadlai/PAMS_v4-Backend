const { oMongoDB } = require("../../database");
const { ObjectId } = require("mongodb");
const oFunctions = require("../../helpers/functions");
const oRegistros = require("../../helpers/actionsLog");

const getCasa = async (req, res) => {
  const { oID, oUserRol, oUserID } = req.body;
  let oCollection = await oMongoDB().collection("Paciente");
  let oQuery = { _id: new ObjectId(oID), isActive: 1 };
  let oResult = await oCollection.findOne(oQuery, {
    projection: {
      Casa: 1,
    },
  });
  oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.GET_CASA);
  if (!oResult) res.send("NOT FOUND").status(404);
  else res.send(oResult).status(200);
};
const updateCasa = async (req, res) => {
  const { oID, oUserRol, oUserID, Casa } = req.body;
  const oQuery = { _id: new ObjectId(oID) };
  const oUpdate = {
    $set: {
      Casa: Casa,
    },
  };
  let oCollection = await oMongoDB().collection("Paciente");
  let oResult = await oCollection.updateOne(oQuery, oUpdate);
  oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.UPDATE_CASA);
  res.send(oResult).status(200);
};
module.exports = {
  getCasa,
  updateCasa,
};
