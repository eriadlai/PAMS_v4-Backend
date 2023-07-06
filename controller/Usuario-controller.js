const { oMongoDB } = require("../src/database");

const getAllUsuarios = async (req, res) => {
  let oCollection = await oMongoDB().collection("Usuario");
  let oResult = await oCollection.find({}).limit(50).toArray();
  res.send(oResult).status(200);
};

const getOneUsuario = async (req, res) => {
  const { oID } = req.body;
  let oCollection = await oMongoDB().collection("Usuario");
  let oQuery = { _id: ObjectId(oID) };
  let oResult = await oCollection.findOne(oQuery);
  if (!oResult) res.send("NOT FOUND").status(404);
  else res.send(oResult).status(200);
};

const insertUsuario = async (req, res) => {
  let oCollection = await oMongoDB().collection("Usuario");
  let oNewUsuario = req.body;
  console.log(oNewUsuario);
  let oResult = await oCollection.insertOne(oNewUsuario);
  res.send(oResult).status(204);
};

const updateUsuario = async (req, res) => {
  const { oID } = req.body;
  const oQuery = { _id: ObjectId(oID) };
  const oUpdate = {
    $push: { Usuario: req.body },
  };
  let oCollection = await oMongoDB().collection("Usuario");
  let oResult = await oCollection.updateOne(oQuery, oUpdate);
  res.send(oResult).status(200);
};

module.exports = {
  getAllUsuarios,
  getOneUsuario,
  insertUsuario,
  updateUsuario,
};
