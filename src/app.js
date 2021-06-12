const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const port = 3000;

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(cors());

// app.get("/api/:a", require("./routes/api.js"));
app.post("/api", require("./routes/api.js"));
app.get("/api/categorias", require("./routes/api.js"));
app.get("/api/bebidas", require("./routes/api.js"));
app.get("/api/entrantes", require("./routes/api.js"));
app.post(
  "/form-submited/:numeroHabitacion",
  require("./routes/form-submited.js")
);
app.post("/login", require("./routes/admin.js"));
app.post("/registro", require("./routes/admin.js"));
app.post("/anadirbebida", require("./routes/admin.js"));
app.post("/anadirentrante", require("./routes/admin.js"));
app.post("/changepass", require("./routes/admin.js"));
app.post("/contact", require("./routes/contactFormEmail.js"));

module.exports = app;
