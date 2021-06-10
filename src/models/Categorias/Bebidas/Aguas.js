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
