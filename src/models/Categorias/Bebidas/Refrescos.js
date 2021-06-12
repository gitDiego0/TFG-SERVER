const db = require("../../firebase.js");
const refrescos = db
  .collection("categorias")
  .doc("Bebida")
  .collection("Refresco");

exports.getRefrescos = async () => {
  const arrayRefrescos = await refrescos
    .get()
    .then((doc) => {
      const items = [];
      doc.forEach((entrada) => {
        items.push(entrada.data());
      });
      return items;
    })
    .catch((e) => {
      console.log("error: ", e);
      return;
    });

  console.log("array: ", arrayRefrescos);

  return arrayRefrescos;
};

exports.getRefresco = async (nombre) => {
  const refresco = await refrescos
    .where("nombre", "==", nombre)
    .get()
    .then((refresco) => {
      return refresco.data();
    })
    .catch((e) => {
      console.log("error al buscar refresco: ", e);
      return false;
    });

  return refresco;
};

exports.addRefresco = async ({ nombre, imagen, precio, cantidad }) => {
  const add = await refrescos
    .doc(nombre)
    .set({
      nombre: nombre || "",
      imagen: imagen || "",
      precio: precio || 0,
      cantidad: cantidad || 0,
    })
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err.message;
    });

  return add;
};

// const updateRefresco = async (data, nombreOld) => {
//   const { nombre, precio, cantidad } = data;

//   const update = await refrescos
//     .doc(`${nombre}`)
//     .update({
//       nombre: nombre,
//       precio: precio,
//       cantidad: cantidad,
//     })
//     .then(() => {
//       return true;
//     })
//     .catch((e) => {
//       console.log("error al actulizar refresco: ", e);
//       return false;
//     });

//   return update;
// };

// const addRefresco = async (data) => {
//   const { nombre, cantidad, precio } = data;

//   const resultado = await refrescos
//     .doc(`${nombre}`)
//     .set({
//       nombre: nombre,
//       cantidad: cantidad,
//       precio: precio,
//     })
//     .then(() => {
//       return true;
//     })
//     .catch((e) => {
//       console.log("error al añadir refresco: ", e);
//       return false;
//     });

//   return resultado;
// };

// module.exports = getRefrescos;
// module.exports = getRefresco;
// module.exports = addRefresco;
// module.exports = updateRefresco;
