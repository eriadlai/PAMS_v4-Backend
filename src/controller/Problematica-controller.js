const { oMongoDB } = require("../database");
const { ObjectId } = require("mongodb");
const oFunctions = require("../helpers/functions");

const getProblematica = async (req, res) => {
  const { oID, oUserRol, oUserID } = req.body;
  let oCollection = await oMongoDB().collection("Paciente");
  let oQuery = { _id: new ObjectId(oID), isActive: 1 };
  let oResult = await oCollection.findOne(oQuery, {
    projection: {
      Problematica: 1,
    },
  });
  oFunctions.resetToken(oUserRol, oUserID);
  if (!oResult) res.send("NOT FOUND").status(404);
  else res.send(oResult).status(200);
};
const updateProblematica = async (req, res) => {
  const { oID, oUserRol, oUserID, Problematica } = req.body;
  const oQuery = { _id: new ObjectId(oID) };
  const oUpdate = {
    $set: {
      Problematica: Problematica,
    },
  };
  let oCollection = await oMongoDB().collection("Paciente");
  let oResult = await oCollection.updateOne(oQuery, oUpdate);
  oFunctions.resetToken(oUserRol, oUserID);
  res.send(oResult).status(200);
};
module.exports = {
  getProblematica,
  updateProblematica,
};
