const { Router } = require("express");
const nodemailer = require("nodemailer");

// const dotenv = require("dotenv").config();
const router = Router();

const mailer = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "contact.hostalapp@gmail.com",
    pass: "258852__",
  },
});

router.post("/contact", async (req, res) => {
  console.log(req.body);
  const {
    valores: { nombre, apellidos, emailInput, subject, Mensaje },
  } = req.body;

  console.log(emailInput);

  mailer.sendMail(
    {
      from: "Hostal App contacto <contact.hostalapp@gmail.com>",
      to: `${emailInput},contact.hostalapp@gmail.com`,
      subject: `${nombre} ${apellidos}: ${subject}`,
      text: `${Mensaje}`,
      html: `${Mensaje}<br><br>${emailInput}`,
    },
    (err, info) => {
      if (err) console.log(err);
      res.json({ success: true });
    }
  );
});

module.exports = router;
