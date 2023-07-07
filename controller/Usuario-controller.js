const { ObjectId } = require("mongodb");
const { oMongoDB } = require("../src/database");

const getAllUsuarios = async (req, res) => {
  let oCollection = await oMongoDB().collection("Usuario");
  let oQuery = { isActive: 1 };
  let oResult = await oCollection
    .find(oQuery, {})
    .project({ password: 0, isActive: 0 })
    .limit(50)
    .toArray();
  res.send(oResult).status(200);
};
const getOneUsuario = async (req, res) => {
  const { oID } = req.body;
  let oCollection = await oMongoDB().collection("Usuario");
  let oQuery = { _id: new ObjectId(oID), isActive: 1 };
  let oResult = await oCollection.findOne(oQuery, {
    projection: {
      password: 0,
      isActive: 0,
    },
  });
  if (!oResult) res.send("NOT FOUND").status(404);
  else res.send(oResult).status(200);
};
const insertUsuario = async (req, res) => {
  let oCollection = await oMongoDB().collection("Usuario");
  let oNewUsuario = req.body;
  oNewUsuario.Roles = new ObjectId(oNewUsuario.Roles);
  let oResult = await oCollection.insertOne(oNewUsuario);
  res.send(oResult).status(204);
};
const updateUsuario = async (req, res) => {
  const { oID, nombre, apellido, correo } = req.body;
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
  res.send(oResult).status(200);
};
const updatePassword = async (req, res) => {
  const { oID, password } = req.body;
  const oQuery = { _id: new ObjectId(oID) };
  const oUpdate = {
    $set: {
      password: password,
    },
  };
  let oCollection = await oMongoDB().collection("Usuario");
  let oResult = await oCollection.updateOne(oQuery, oUpdate);
  res.send(oResult).status(200);
};
const deleteUsuario = async (req, res) => {
  const { oID } = req.body;
  const oQuery = { _id: new ObjectId(oID) };
  const oUpdate = {
    $set: {
      isActive: 0,
    },
  };
  let oCollection = await oMongoDB().collection("Usuario");
  let oResult = await oCollection.updateOne(oQuery, oUpdate);
  res.send(oResult).status(200);
};
//*! LINEA PARA INGRESAR ARRAY DENTRO DE COLECCION $push: { nombreColumna: VariableInfo} */
module.exports = {
  getAllUsuarios,
  getOneUsuario,
  insertUsuario,
  updateUsuario,
  deleteUsuario,
  updatePassword,
};
