const db = require("../firebase.js");
const getBebidas = require("./Bebidas/Bebidas.js");

// const categorias = db.collection("categorias");
// const bebidas = categorias.doc("Bebida");
// const entrante = categorias.doc("Entrante");
// const primerPlato = categorias.doc("Primer Plato");
// const segundoPlato = categorias.doc("Segundo Plato");
// const postre = categorias.doc("Postre");

const getCategorias = async () => {
  const categorias = await db
    .collection("categorias")
    .get()
    .then((categoria) => {
      const resultados = [];
      categoria.forEach((entrada) => {
        resultados.push(entrada.data());
      });
      return resultados;
    });

  return categorias;
};

module.exports = getCategorias;
