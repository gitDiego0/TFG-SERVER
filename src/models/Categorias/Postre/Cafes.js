const db = require("../../firebase.js");
const cafes = db.collection("categorias").doc("Postre").collection("Café");

exports.getCafes = async () => {
  const arrayCafes = await cafes
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

  return arrayCafes;
};
