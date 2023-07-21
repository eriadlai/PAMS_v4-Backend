const { ObjectId } = require("mongodb");
const { oMongoDB } = require("../src/database");
const { verifyPassword, hashPassword } = require("../helpers/hashing");
const oFunctions = require("../helpers/functions");

const getAllUsuarios = async (req, res) => {
  const { oUserRol, oUserID } = req.body;
  let oCollection = await oMongoDB().collection("Usuario");
  let oQuery = { isActive: 1 };
  let oResult = await oCollection
    .find(oQuery, {})
    .project({ password: 0, isActive: 0, token: 0 })
    .limit(50)
    .toArray();
  oFunctions.resetToken(oUserRol, oUserID);
  res.send(oResult).status(200);
};
const getOneUsuario = async (req, res) => {
  const { oID, oUserRol, oUserID } = req.body;
  let oCollection = await oMongoDB().collection("Usuario");
  let oQuery = { _id: new ObjectId(oID), isActive: 1 };
  let oResult = await oCollection.findOne(oQuery, {
    projection: {
      password: 0,
      isActive: 0,
    },
  });
  oFunctions.resetToken(oUserRol, oUserID);
  if (!oResult) res.send("NOT FOUND").status(404);
  else res.send(oResult).status(200);
};
const insertUsuario = async (req, res) => {
  const { oUserRol, oUserID } = req.body;

  let oCollection = await oMongoDB().collection("Usuario");
  let oNewUsuario = req.body;
  delete oNewUsuario.oUserRol;
  delete oNewUsuario.oUserID;
  oNewUsuario.Roles = new ObjectId(oNewUsuario.Roles);
  oNewUsuario.password = await hashPassword(oNewUsuario.password);
  oNewUsuario.token = "";
  let oResult = await oCollection.insertOne(oNewUsuario);
  oFunctions.resetToken(oUserRol, oUserID);
  res.send(oResult).status(204);
};
const updateUsuario = async (req, res) => {
  const { oID, nombre, apellido, correo, oUserRol, oUserID } = req.body;
  const oQuery = { _id: new ObjectId(oID) };
  const oUpdate = {
    $set: {
      nombre: nombre,
      apellido: apellido,
      correo: correo,
    },
  };
  let oCollection = await oMongoDB().collection("Usuario");
  let oResult = await oCollection.updateOne(oQuery, oUpdate);
  oFunctions.resetToken(oUserRol, oUserID);
  res.send(oResult).status(200);
};
const updatePassword = async (req, res) => {
  const { oID, password, oUserRol, oUserID } = req.body;
  const oQuery = { _id: new ObjectId(oID), isActive: 1 };
  const oHashedPassword = await hashPassword(password);
  const oUpdate = {
    $set: {
      password: oHashedPassword,
    },
  };
  let oCollection = await oMongoDB().collection("Usuario");
  let oResult = await oCollection.updateOne(oQuery, oUpdate);
  oFunctions.resetToken(oUserRol, oUserID);
  res.send(oResult).status(200);
};
const deleteUsuario = async (req, res) => {
  const { oID, oUserRol, oUserID } = req.body;
  const oQuery = { _id: new ObjectId(oID) };
  const oUpdate = {
    $set: {
      isActive: 0,
    },
  };
  let oCollection = await oMongoDB().collection("Usuario");
  let oResult = await oCollection.updateOne(oQuery, oUpdate);
  oFunctions.resetToken(oUserRol, oUserID);
  res.send(oResult).status(200);
};
const getLogin = async (req, res) => {
  const { oUser, oPass } = req.body;
  let oCollection = await oMongoDB().collection("Usuario");
  let oQuery = { isActive: 1 };
  let oFiltros = {
    projection: {
      isActive: 0,
    },
    filter: {
      correo: {
        $eq: oUser,
      },
    },
  };
  let oResult = await oCollection.findOne(oQuery, oFiltros);
  let hashedPassword = "";
  if (!oResult) res.send("NOT FOUND").status(404);
  else hashedPassword = oResult.password;
  const isValid = await verifyPassword(oPass, hashedPassword);

  if (!isValid) {
    res.send("CREDENCIALES INVALIDAS").status(401);
    return;
  }
  const oRolInfo = await oFunctions.getRolInfo(oResult.Roles);
  oResult.Roles = oRolInfo.nombre;
  oFunctions.resetToken(oResult.Roles, oResult._id);
  res.send(oResult).status(200);
};
const getTokenByID = async (req, res) => {
  const { oID } = req.body;
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
module.exports = {
  getAllUsuarios,
  getOneUsuario,
  insertUsuario,
  updateUsuario,
  deleteUsuario,
  updatePassword,
  getLogin,
  getTokenByID,
};
//*! LINEA PARA INGRESAR ARRAY DENTRO DE COLECCION $push: { nombreColumna: VariableInfo} */
