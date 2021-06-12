const { Router } = require("express");
const router = Router();
const getFechaEntrada = require("../models/Habitacion/Room.js");
const getRefrescos = require("../models/Categorias/Bebidas/Refrescos.js");
const login = require("../models/Admin/Admin.js");
const getCategorias = require("../models/Categorias/Categorias.js");
const { getBebidas } = require("../models/Categorias/Bebidas/Bebidas.js");
const { getEntrantes } = require("../models/Categorias/Entrante/Entrantes.js");

// router.get("/api/:a", async (req, res) => {
//   const { a } = req.params;

//   const resultado = await getFechaEntrada(a);
//   // console.log("resultado: ", resultado);

//   return res.status(200).json({ resultado: "ok" });
// });

router.post("/api", async (req, res) => {
  // const bebidas = await getRefrescos();
  // console.log(bebidas);
  // return res.status(200).json({ resultado: "ok" });

  const usuario = await login();
  if (usuario === true) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

router.get("/api/categorias", async (req, res) => {
  const categorias = await getCategorias();
  return res.status(200).json(categorias);
});

router.get("/api/entrantes", async (req, res) => {
  const entrantes = await getEntrantes();
  return res.status(200).json(entrantes);
});

router.get("/api/bebidas", async (req, res) => {
  const bebidas = await getBebidas().then((obj) => {
    return obj;
  });
  console.log("bebidas", bebidas);
  if (bebidas != undefined || null) {
    return res.status(200).json({ bebidas });
  } else {
    return res.status(500).send({ message: "error" });
  }
});

module.exports = router;
