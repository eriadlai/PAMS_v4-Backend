const oPaciente = {
  oUserID: "64a7077029eadf14e0fc8fd1",
  oUserRol: "ADMINISTRADOR",
  nombre: "",
  apellido: "",
  fechaNacimiento: "",
  ocupacion: "",
  actividadExtra: "",
  direccion: "",
  telefono: "",
  fechaRegistro: "",
  isActive: 1,
  noExpediente: "",
  estadoCivil: "",
  AntecedentesClinicos: {
    psicologico: "",
    psiquiatrico: "",
    patologico: "",
  },
  AntecedentesFamiliares: {
    enfermedadGrave: "",
    accidentes: "",
    medicamentos: "",
    intervencionQuirurgica: "",
    discapacidadAuxiliar: "",
  },
  CirculoSocial: {
    social: "",
    laboral: "",
    vivienda: "",
  },
  Problematica: {
    evolucion: "",
    causas: "",
    acciones: "",
    implicaciones: "",
    resultadosObbtenidos: "",
    tratamientos: [
      {
        tratamiento: "",
        aplicacion: "",
        lugar: "",
        duracion: "",
        fechas: "",
      },
    ],
  },
  EstadoMental: {
    lenguaje: "",
    emocional: "",
    realidad: "",
    higiene: "",
  },
  Habitos: {
    alimento: "",
    sleep: "",
    antecedentePsiccologico: "",
  },
  HistorialSexual: {
    abuso: "",
    embarazo: "",
    edadEmbarazo: "",
    preferenciaSexual: "",
  },
  Casa: {
    tipo: "",
    cantHabitacion: "",
    cantFamilias: "",
    ingresoFamiliar: "",
    serviciosHogar: [""],
  },
  Familiar: {
    nombre: "",
    apellido: "",
    parentesco: "",
    ocupacion: "",
    fechaNacimiento: "",
    sustancia: [""],
  },
  Sustancia: [""],
  nivelEscolar: "",
  religion: "",
  AspectoConsumo: "",
};
const oUsuario = {
  nombre: "Fernando",
  apellido: "Perez",
  correo: "Fer@gmail.com",
  password: "test1234",
  isActive: 1,
  Roles: "64a662f22e8aca166d312a14",
  oUserRol: "64a662f22e8aca166d312a14",
  oUserID: "64a7077029eadf14e0fc8fd1",
};
const oRol = { nombre: "ADMINISTRADOR", isActive: 1 };
const oAspectoConsumo = {
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