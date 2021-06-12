const db = require("../../firebase.js");
const entrantes = db
  .collection("categorias")
  .doc("Entrante")
  .collection("Entrante");

exports.getEntrantes = async () => {
  const arrayEntrantes = await entrantes
    .get()
    .then((doc) => {
      const entradas = [];
      doc.forEach((entrada) => {
        entradas.push(entrada.data());
      });
      return entradas;
    })
    .catch((err) => {
      return err.message;
    });

  return arrayEntrantes;
};

exports.addEntrante = async ({ nombre, imagen, precio, ingredientes }) => {
  const add = await entrantes
    .doc(nombre)
    .set({
      nombre: nombre || "",
      imagen: imagen || "",
      precio: precio || 0,
      ingredientes: ingredientes || {},
    })
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err.message;
    });
  return add;
};
