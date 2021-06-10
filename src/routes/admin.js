const { Router } = require("express");
const db = require("../models/firebase.js");

const { userSign, registro } = require("../models/Admin/Admin.js");

// const changePass = require("../models/Admin/Admin.js");

const router = Router();

router.post("/login", async (req, res) => {
  console.log(req.body);
  const {
    valores: { email },
  } = req.body;
  // const usuario = await login(username, password);
  // if (usuario === true) {
  //   res.sendStatus(200);
  // } else {
  //   res.sendStatus(500);
  // }

  const token = userSign(email).then((string) => {
    console.log("string: ", string);
  });
  console.log("token: ", token);
});

router.post("/registro", async (req, res) => {
  const {
    valores: { email, password },
  } = req.body;

  const resultado = await registro(email, password).then((message) => {
    return message;
  });
  console.log("resultado de registro", resultado);
});

// router.post("/changepass", async (req, res) => {
//   const { password } = req.body;

//   const resultado = await changePass(password);
//   if (resultado) {
//     return res.sendStatus(200);
//   } else {
//     return res.sendStatus(500);
//   }
// });

router.post("/anadirbebida", async (req, res) => {
  console.log("valores a añadir: ", req.body);
  return res.status(200);
});

module.exports = router;
