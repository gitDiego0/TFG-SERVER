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
  const { valores } = req.body;

  mailer.sendMail(
    {
      from: "Hostal App contacto <contact.hostalapp@gmail.com>",
      to: `${valores.emailInput},contact.hostalapp@gmail.com`,
      subject: `${valores.nombre} ${valores.apellidos}: ${valores.subject}`,
      text: `${valores.Mensaje}`,
      html: `
                  <div>
                    <h1>Gracias por su mensaje ${valores.nombre}</h1>
                    <h3>Lo revisaremos lo mas pronto posible y nos pondremos en contacto en caso necesario</h3>
                  </div>
                  <div>
                    <p>Datos del mensaje:</p>
                    <div>
                      <p>Nombre: ${valores.nombre}</p>
                      <p>Apellidos: ${valores.apellidos}</p>                        
                      <p>Email: ${valores.emailInput}</p>
                      <p>Asunto: ${valores.subject}</p>
                        <hr style="height:2px;border-width:0;color:gray;background-color:gray">
                        <br>
                        <p>${valores.Mensaje}</p>
                        
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
