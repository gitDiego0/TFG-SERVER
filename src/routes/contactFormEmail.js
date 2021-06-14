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
      html: `
                  <div>
                    <h1>Gracias por su mensaje ${valores.nombre}</h1>
                    <h3>Lo revisaremos lo mas pronto posible y nos pondremos en contacto en caso necesario</h3>
                  </div>
                  <div>
                    <p>Datos del mensaje:</p>
                    <div>
                      <p>Nombre: ${nombre}</p>
                      <p>Apellidos: ${apellidos}</p>                        
                      <p>Email: ${emailInput}</p>
                      <p>Asunto: ${subject}</p>
                        <hr style="height:2px;border-width:0;color:gray;background-color:gray">
                        <br>
                        <p>${Mensaje}</p>
                        
                    </div>
                  </div>
                  `,
    },
    (err, info) => {
      if (err) console.log(err);
      res.json({ success: true });
    }
  );
});

module.exports = router;
