const db = require("../../firebase.js");
const tartas = db.collection("categorias").doc("Postre").collection("Tarta");

exports.getTartas = async () => {
  const arrayTartas = await tartas
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

  return arrayTartas;
};
