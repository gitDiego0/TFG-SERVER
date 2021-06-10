const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyBRlESZoRkLtjvICjeIXMqzqlQJbOZy50g",
  authDomain: "tfg-app-b932a.firebaseapp.com",
  projectId: "tfg-app-b932a",
  storageBucket: "tfg-app-b932a.appspot.com",
  messagingSenderId: "805419805781",
  appId: "1:805419805781:web:d80d5c657fa0b72469b8dc",
  measurementId: "G-62G9E0X17J",
};
firebase.initializeApp(firebaseConfig);
const client = firebase;

module.exports = client;
