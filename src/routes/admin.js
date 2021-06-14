const { Router } = require("express");
const db = require("../models/firebase.js");

const { userSign, registro } = require("../models/Admin/Admin.js");
const { addRefresco } = require("../models/Categorias/Bebidas/Refrescos.js");
const { addAgua } = require("../models/Categorias/Bebidas/Aguas.js");
const { addAlcohol } = require("../models/Categorias/Bebidas/Alcohol.js");
const { addEntrante } = require("../models/Categorias/Entrante/Entrantes.js");
const { getReservaHabitacion } = require("../models/Habitacion/Room.js");
const { deleteItem } = require("../models/Categorias/Categorias.js");

// const changePass = require("../models/Admin/Admin.js");

const router = Router();

router.post("/anadirentrante", async (req, res) => {
  const { valores } = req.body;

  const add = await addEntrante(valores);
});

router.post("/anadirbebida", async (req, res) => {
  const { valores } = req.body;

  const { categoria } = valores;

  // const FUNCIONES = {
  //   Refresco: await addRefresco(valores),
  //   Agua: await addAgua(valores),
  //   Alcohol: await addAlcohol(valores),
  // };

  let add;
  if (categoria === "Refresco") {
    add = await addRefresco(valores);
    console.log(categoria === "Refresco");
  } else if (categoria === "Agua") {
    add = await addAgua(valores);
    console.log(categoria === "Agua");
  } else if (categoria === "Alcohol") {
    add = await addAlcohol(valores);
    console.log(categoria === "Alcohol");
  }

  // const add = await addRefresco(valores);
  // console.log("añadir ", add);
  console.log("add:", add);
  if (add) {
    return res.status(200);
  } else {
    return res.status(500);
  }
});

router.get("/getreserva/:numeroHabitacion", async (req, res) => {
  const { numeroHabitacion } = req.params;
  const reservas = await getReservaHabitacion(numeroHabitacion).then((obj) => {
    // console.log(obj);
    return obj;
  });

  res.status(200).json({ reservas });
});

router.post("/delete", async (req, res) => {
  const { nombre, categoria, subcategoria } = req.body;
  const resultado = deleteItem(nombre, categoria, subcategoria);
});

module.exports = router;
