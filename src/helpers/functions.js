const { ObjectId } = require("mongodb");
const { oMongoDB } = require("../database");
const { generateToken } = require("./tokens");

const getTokenUsuario = async (oID) => {
  let oCollection = await oMongoDB().collection("Usuario");
  let oQuery = { _id: new ObjectId(oID), isActive: 1 };
  let oResult = await oCollection.findOne(oQuery, {
    projection: {
      token: 1,
    },
  });
  if (!oResult) res.send("NOT FOUND").status(404);
  else return oResult;
};
const updateTokenUsuario = async (oID, oToken) => {
  const oQuery = { _id: new ObjectId(oID) };
  const oUpdate = {
    $set: {
      token: oToken,
    },
  };
  let oCollection = await oMongoDB().collection("Usuario");
  await oCollection.updateOne(oQuery, oUpdate);
};
const getRolInfo = async (oID) => {
  let oCollection = await oMongoDB().collection("Roles");
  let oQuery = { _id: oID, isActive: 1 };
  let oResult = await oCollection.findOne(oQuery);
  if (!oResult) res.send("NOT FOUND").status(404);
  else return oResult;
};
const resetToken = async (oRol, oID) => {
  const oToken = generateToken(new ObjectId(oID), oRol);
  updateTokenUsuario(oID, oToken);
  return oToken;
};
module.exports = {
  getTokenUsuario,
  updateTokenUsuario,
  getRolInfo,
  resetToken,
};
