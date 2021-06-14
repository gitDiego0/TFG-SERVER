const db = require("../../firebase.js");
const { getTartas } = require("./Tarta.js");
const { getHelados } = require("./Helado.js");
const { getCafes } = require("./Cafes.js");

exports.getPostres = async () => {
  const postres = [];
  const tartas = await getTartas();
  const helados = await getHelados();
  const cafes = await getCafes();
  postres.push({ tartas: tartas });
  postres.push({ helados: helados });
  postres.push({ cafes: cafes });

  return postres;
};
