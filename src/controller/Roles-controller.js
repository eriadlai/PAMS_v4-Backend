const { oMongoDB } = require("../database");

const getAllRoles = async (req, res) => {
  let oCollection = await oMongoDB().collection("Roles");
  let oResult = await oCollection.find({}).limit(50).toArray();
  res.send(oResult).status(200);
};
const getOneRoles = async (req, res) => {
  const { oID } = req.body;
  let oCollection = await oMongoDB().collection("Roles");
  let oQuery = { _id: new ObjectId(oID), isActive: 1 };
  let oResult = await oCollection.findOne(oQuery);
  if (!oResult) res.send("NOT FOUND").status(404);
  else res.send(oResult).status(200);
};
const insertRoles = async (req, res) => {
  let oCollection = await oMongoDB().collection("Roles");
  let oNewRol = req.body;
  let oResult = await oCollection.insertOne(oNewRol);
  res.send(oResult).status(204);
};

const updateRoles = async (req, res) => {
  const { oID } = req.body;
  const oQuery = { _id: ObjectId(oID) };
  const oUpdate = {
    $push: { Roles: req.body },
  };
  let oCollection = await oMongoDB().collection("Roles");
  let oResult = await oCollection.updateOne(oQuery, oUpdate);
  res.send(oResult).status(200);
};

module.exports = {
  getAllRoles,
  insertRoles,
  updateRoles,
  getOneRoles,
};
