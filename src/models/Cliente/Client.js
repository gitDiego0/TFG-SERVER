const db = require("../firebase.js");

const clientes = db.collection("clientes");

const checkCliente = async (identificacion) => {
  console.log("identificacion: ", identificacion);
  const resultado = clientes
    .doc(`${identificacion}`)
    .get()
    .then((cliente) => {
      if (cliente.exists) {
        console.log("el cliente existe en la bd");
        return true;
      } else {
        console.log("el cliente no existe en la bd");
        return false;
      }
    });

  return resultado;
};

const addCliente = async (data) => {
  const {
    nombre,
    apellidos,
    emailInput,
    identificacion,
    telefono,
    pais,
    codigoPostal,
  } = data;

  console.log("data: ", data);

  const resultado = clientes
    .doc(`${identificacion}`)
    .set({
      nombre: nombre,
      apellidos: apellidos,
      email: emailInput,
      telefono: telefono,
      identificacion: identificacion,
      pais: pais,
      codigoPostal: codigoPostal,
    })
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log("error addCliente: ", error);
      return false;
    });

  return resultado;
};

exports.checkCliente = checkCliente;
exports.addCliente = addCliente;
