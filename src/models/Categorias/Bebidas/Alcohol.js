const db = require("../../firebase.js");
const alcohol = db.collection("categorias").doc("Bebida").collection("Alcohol");

exports.getAlcohol = async () => {
  const arrayAlcohol = await alcohol
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

  return arrayAlcohol;
};

exports.addAlcohol = async ({ nombre, imagen, precio, cantidad }) => {
  const add = await alcohol
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
