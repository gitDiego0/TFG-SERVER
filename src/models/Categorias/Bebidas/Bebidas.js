const db = require("../../firebase.js");
const { getRefrescos } = require("./Refrescos.js");
const { getAguas } = require("./Aguas.js");

const aguas = db.collection("categorias").doc("Bebida").collection("Agua");

exports.getBebidas = async () => {
  const bebidas = [];
  const refrescos = await getRefrescos();
  const aguas = await getAguas();
  console.log("aguas: ", aguas);
  bebidas.push({ refrescos: refrescos });
  bebidas.push({ aguas: aguas });

  return bebidas;
};

// const getAguas = async () => {
//   const arrayAguas = aguas
//     .get()
//     .then(async (doc) => {
//       const items = [];
//       doc.forEach((entrada) => {
//         items.push(entrada.data());
//       });
//       return items;
//     })
//     .catch((e) => console.log(e));

//   return arrayAguas;
// };

// module.exports = getBebidas;
