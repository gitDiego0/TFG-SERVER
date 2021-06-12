const db = require("../../firebase.js");
const aguas = db.collection("categorias").doc("Bebida").collection("Agua");

exports.getAguas = async () => {
  const arrayAguas = await aguas
    .get()
    .then((doc) => {
      const items = [];
      doc.forEach((entrada) => {
        console.log("entrada: ", entrada);
        items.push(entrada.data());
      });
      return items;
    })
    .catch((err) => {
      return err.message;
    });

  return arrayAguas;
};

exports.addAgua = async ({ nombre, imagen, precio, cantidad }) => {
  const add = await aguas
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
