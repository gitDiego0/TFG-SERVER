const db = require("../../firebase.js");
const helados = db.collection("categorias").doc("Postre").collection("Helados");

exports.getHelados = async () => {
  const arrayHelados = await helados
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

  return arrayHelados;
};
