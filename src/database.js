const { MongoClient } = require("mongodb");

const cliente = new MongoClient(process.env.HOST);
let conexion;

async function run() {
  try {
    conexion = await cliente.connect();
  } catch (e) {
    console.error("ERROR EN LA CONEXION: ", e);
  }
}
run();

module.exports = {
  oMongoDB: () => {
    return conexion.db(process.env.DATABASE);
  },
};
