const db = require("../firebase.js");
const format = require("date-fns");
const ErrorHandle = require("../../utils/handleError.js");

const habitacion = db.collection("habitaciones");

const reservarHabitacion = async (valores, numeroHabitacion) => {
  console.log("valores: ", valores);
  console.log("numeroHabitacion: ", numeroHabitacion);
  const { fechaEntrada, fechaSalida, identificacion, precioTotal } = valores;

  console.log("entra en la reserva");
  const resultado = habitacion
    .doc(`${numeroHabitacion}`)
    .collection("reservas")
    .doc()
    .set({
      fechaEntrada: fechaEntrada,
      fechaReserva: new Date(),
      fechaSalida: fechaSalida,
      id_cliente: db.doc(`clientes/${identificacion}`),
      precio_total: precioTotal,
    })
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log("error: ", error);
      return false;
    });

  return resultado;
};

const getFechaEntrada = async (numeroHabitacion) => {
  const reserva = await db
    .collection(`habitaciones/${numeroHabitacion}/reservas`)
    .get();
  reserva.forEach((doc) => {
    const { fechaEntrada } = doc.data();
    console.log("cada reserva realizada: ", fechaEntrada);
  });
};

const checkDates = async (numeroHabitacion) => {
  try {
    const fechaEntrada = await getFechaEntrada(numeroHabitacion);
    // console.log("fecha de entrada: ", fechaEntrada);
  } catch (e) {
    console.log(e);
  }
};

exports.reservarHabitacion = reservarHabitacion;
exports.getFechaEntrada = getFechaEntrada;
exports.checkDates = checkDates;
