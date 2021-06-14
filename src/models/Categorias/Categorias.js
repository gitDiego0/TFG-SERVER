const db = require("../firebase.js");

// const categorias = db.collection("categorias");
// const bebidas = categorias.doc("Bebida");
// const entrante = categorias.doc("Entrante");
// const primerPlato = categorias.doc("Primer Plato");
// const segundoPlato = categorias.doc("Segundo Plato");
// const postre = categorias.doc("Postre");

exports.getCategorias = async () => {
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
exports.deleteItem = async (nombre, categoria, subCategoria) => {
  console.log("nombre: ", nombre);
  const resultado = await db
    .collection("categorias")
    .doc(`${categoria}`)
    .collection(`${subCategoria}`)
    .doc(`${nombre}`)
    .delete()
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err.message;
    });
  return resultado;
};
