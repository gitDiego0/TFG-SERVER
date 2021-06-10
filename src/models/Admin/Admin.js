const db = require("../firebase.js");
const admindb = require("firebase-admin");
const client = require("../Client/client.js");

const admin = db.collection("admin").doc("administrador");

// const checkLogin = (user, pass) => {
//   const resultado = admin.get().then((adminData) => {
//     const { password, username } = adminData.data();
//     console.log("usuario que llega: ", pass);

//     if (user === username && pass === password) {
//       return true;
//     } else {
//       return false;
//     }
//   });

//   return resultado;
// };

// const changePass = (pass) => {
//   const resultado = admin.update({ password: pass });
//   if (resultado) {
//     return true;
//   } else {
//     return false;
//   }
// };

exports.registro = async (email, pass) => {
  // const provider = await client
  //   .auth()
  //   .createUserWithEmailAndPassword(email, password)
  //   .then((userCredential) => {
  //     const user = userCredential.user;
  //     return user;
  //   })
  //   .catch((err) => {
  //     console.log(`Error ${err.code} al iniciar sesion: ${err.message}`);
  //   });

  // return provider;

  try {
    const resultado = await admindb
      .auth()
      .createUser({
        email: email,
        emailVerified: true,
        password: pass,
        displayName: "Admin",
        disabled: false,
      })
      .then((resultado) => {
        return { message: "usuario creado correctamente" };
      })
      .catch((e) => {
        return e.message;
      });
    return resultado;
  } catch (e) {
    return { message: "error al crear el usuario" };
  }
};

exports.userSign = async (email, pass) => {
  // const provider = await client
  //   .auth()
  //   .signInWithEmailAndPassword(email, pass)
  //   .then((userCredential) => {
  //     const usuario = userCredential.user;
  //     console.log("user: ", usuario);
  //     return usuario;
  //   })
  //   .catch((err) => {
  //     console.log(`Error ${err.code} al iniciar sesion: ${err.message}`);
  //   });

  // return provider;
  try {
    const user = await admindb.auth().getUserByEmail(email);
    try {
      const token = await admindb.auth().createCustomToken(email);
      return token;
    } catch (e) {
      return { message: "error al generar el token" };
    }
  } catch (e) {
    return { message: "ningun usuario encontrado" };
  }
};

exports.getUser = async () => {
  const resultado = client.auth().currentUser((user) => {
    if (user) {
      console.log("actual user: ", user);
    } else {
      console.log("no hay usuario");
    }

    return resultado;
  });
};

// module.exports = checkLogin;
// module.exports = changePass;
