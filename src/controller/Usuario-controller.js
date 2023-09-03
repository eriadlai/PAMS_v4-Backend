const { ObjectId } = require("mongodb");
const { oMongoDB } = require("../database");
const { verifyPassword, hashPassword } = require("../helpers/hashing");
const oFunctions = require("../helpers/functions");
const oRegistros = require("../helpers/actionsLog");

const getAllUsuarios = async (req, res) => {
  const { oUserRol, oUserID } = req.body;
  let oCollection = await oMongoDB().collection("Usuario");
  let oQuery = { isActive: 1 };
  let oResult = await oCollection
    .find(oQuery, {})
    .project({ password: 0, isActive: 0, token: 0 })
    .limit(50)
    .toArray();

  for (let i = 0; i < oResult.length; i++) {
    const oGetRol = await oFunctions.getRolInfo(oResult[i].Roles);
    oResult[i].Roles = oGetRol.nombre;
  }
  oResult[oResult.length] = {
    _id: oResult.length,
    token: await oFunctions.resetToken(oUserRol, oUserID),
  };
  await oFunctions.setLog(oUserID, oRegistros.oActions.GET_USUARIOS);
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
  oResult.token = oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.GET_ONE_USUARIO);
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
  oResult.token = await oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.INSERT_USUARIO);
  res.send(oResult).status(204);
};
const updateUsuario = async (req, res) => {
  const { oID, nombre, apellido, correo, Roles, oUserRol, oUserID } = req.body;
  const oQuery = { _id: new ObjectId(oID) };
  const oUpdate = {
    $set: {
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      Roles: new ObjectId(Roles),
    },
  };
  let oCollection = await oMongoDB().collection("Usuario");
  let oResult = await oCollection.updateOne(oQuery, oUpdate);
  oResult.token = await oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.UPDATE_USUARIO);
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
  oResult.token = oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.UPDDATE_PASSWORD);
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
  oResult.token = oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.DELETE_USUARIO);
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
  oResult.token = await oFunctions.resetToken(oResult.Roles, oResult._id);
  oFunctions.setLog(oResult._id, "INICIO DE SESION");
  delete oResult.password;
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
