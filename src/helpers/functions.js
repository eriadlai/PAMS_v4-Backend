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
const setAspectoConsumo = async () => {
  console.log("ENTRO EN LA FUNCION====");
  let oCollection = await oMongoDB().collection("AspectoConsumo");
  const oNewAspectoConsumo = {
    problemadSalud: "N/A",
    consumoMedicamento: "N/A",
    razonConsumoInicial: "N/A",
    edadConsumo: "N/A",
    razonProblematica: "N/A",
    edadProblematica: "N/A",
    frecuenciaConsumo: "N/A",
    cantidadConsumo: "N/A",
    tiempoConsumo: "N/A",
    lapsoConsumo: "N/A",
    duracionEpisodio: "N/A",
    consumoSemanal: "N/A",
    razonDejarConsumo: "N/A",
    escalaDejarConsumo: "N/A",
    porcentajeSalario: "N/A",
    cantDejarConsumo: "N/A",
    maxPeriodoAbst: "N/A",
    razonAbstinencia: "N/A",
    infAdicional: "N/A",
    isActive: 1,
    nivelProblematica: "",
    importanciaConsumo: "",
    ControlConsumo: "",
    Conflictos: {
      diasNoTrabajados: "N/A",
      cantPerdidaEmpleo: "N/A",
      cantArrestos: "N/A",
    },
    Hospitalizacion: {
      cantVisitas: "N/A",
      diasInternado: "N/A",
      condicion: "N/A",
      medidas: "N/A",
    },
    ProblemasFam: ["N/A"],
    ProblemasPareja: ["N/A"],
    ProblemasSociales: ["N/A"],
    ProblemasLaboral: ["N/A"],
    ProblemasLegales: ["N/A"],
    ProblemasSalud: ["N/A"],
  };

  const result = await oCollection.insertOne(oNewAspectoConsumo);
  return result.insertedId;
};
module.exports = {
  getTokenUsuario,
  updateTokenUsuario,
  getRolInfo,
  resetToken,
  setAspectoConsumo,
};
