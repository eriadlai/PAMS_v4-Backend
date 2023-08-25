const { oMongoDB } = require("../../database");
const { ObjectId } = require("mongodb");
const oFunctions = require("../../helpers/functions");
const oRegistros = require("../../helpers/actionsLog");

const getOneAspectoConsumo = async (req, res) => {
  const { oID, oUserRol, oUserID } = req.body;
  let oCollection = await oMongoDB().collection("AspectoConsumo");
  let oQuery = { _id: new ObjectId(oID), isActive: 1 };
  let oResult = await oCollection.findOne(oQuery, {
    projection: {
      isActive: 0,
    },
  });
  oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.GET_ONE_ASPECTO_CONSUMO);
  if (!oResult) res.send("NOT FOUND").status(404);
  else res.send(oResult).status(200);
};
const updateAspectoConsumo = async (req, res) => {
  const {
    oID,
    problemadSalud,
    consumoMedicamento,
    razonConsumoInicial,
    edadConsumo,
    razonProblematica,
    edadProblematica,
    frecuenciaConsumo,
    cantidadConsumo,
    tiempoConsumo,
    lapsoConsumo,
    duracionEpisodio,
    consumoSemanal,
    razonDejarConsumo,
    escalaDejarConsumo,
    porcentajeSalario,
    cantDejarConsumo,
    maxPeriodoAbst,
    razonAbstinencia,
    infAdicional,
    ControlConsumo,
    importanciaConsumo,
    nivelProblematica,
    Conflictos,
    Hospitalizacion,
    ProblemasFam,
    ProblemasPareja,
    ProblemasSociales,
    ProblemasLaboral,
    ProblemasLegales,
    ProblemasSalud,
    oUserRol,
    oUserID,
  } = req.body;

  const oQuery = { _id: new ObjectId(oID) };
  const oUpdate = {
    $set: {
      problemadSalud: problemadSalud,
      consumoMedicamento: consumoMedicamento,
      razonConsumoInicial: razonConsumoInicial,
      edadConsumo: edadConsumo,
      razonProblematica: razonProblematica,
      edadProblematica: edadProblematica,
      frecuenciaConsumo: frecuenciaConsumo,
      cantidadConsumo: cantidadConsumo,
      tiempoConsumo: tiempoConsumo,
      lapsoConsumo: lapsoConsumo,
      duracionEpisodio: duracionEpisodio,
      consumoSemanal: consumoSemanal,
      razonDejarConsumo: razonDejarConsumo,
      escalaDejarConsumo: escalaDejarConsumo,
      porcentajeSalario: porcentajeSalario,
      cantDejarConsumo: cantDejarConsumo,
      maxPeriodoAbst: maxPeriodoAbst,
      razonAbstinencia: razonAbstinencia,
      infAdicional: infAdicional,
      ControlConsumo: ControlConsumo,
      importanciaConsumo: importanciaConsumo,
      nivelProblematica: nivelProblematica,
      Conflictos: Conflictos,
      Hospitalizacion: Hospitalizacion,
      ProblemasFam: ProblemasFam,
      ProblemasPareja: ProblemasPareja,
      ProblemasSociales: ProblemasSociales,
      ProblemasLaboral: ProblemasLaboral,
      ProblemasLegales: ProblemasLegales,
      ProblemasSalud: ProblemasSalud,
    },
  };
  let oCollection = await oMongoDB().collection("AspectoConsumo");
  let oResult = await oCollection.updateOne(oQuery, oUpdate);
  oFunctions.resetToken(oUserRol, oUserID);
  oFunctions.setLog(oUserID, oRegistros.oActions.UPDATE_ASPECTO_CONSUMO);
  res.send(oResult).status(200);
};
module.exports = {
  getOneAspectoConsumo,
  updateAspectoConsumo,
};
