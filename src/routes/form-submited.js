const { Router } = require("express");
const nodemailer = require("nodemailer");

const db = require("../models/firebase.js");
const {
  reservarHabitacion,
  getFechaEntrada,
} = require("../models/Habitacion/Room.js");
// const checkCliente = require("../models/Cliente/Client.js");
const { checkCliente, addCliente } = require("../models/Cliente/Client.js");

const router = Router();
const mailer = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "reservas.hostalapp@gmail.com",
    pass: "258852__",
  },
});

// const axios = axiosjs.create({
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//   },
// });

router.post("/form-submited/:numeroHabitacion", async (req, res, next) => {
  const { valores } = req.body;
  const { numeroHabitacion } = req.params;

  // await console.log(checkCliente(valores.identificacion));

  try {
    if (valores.identificacion === undefined || valores.identificacion === "") {
      return res.status(500).json({ message: "Error" });
    }
    await checkCliente(valores.identificacion).then(async (resultado) => {
      console.log("el resultado de checkar cliente es: ", resultado);
      if (resultado) {
        console.log("entra en el if");

        const reserva = await reservarHabitacion(
          valores,
          numeroHabitacion
        ).then((resultadoReserva) => {
          return resultadoReserva
            ? (mailer.sendMail(
                {
                  from: "Hostal App Reservas <reservas.hostalapp@gmail.com>",
                  to: `${valores.emailInput},reservas.hostalapp@gmail.com`,
                  subject: `${valores.nombre} ${valores.apellidos}: Reserva habitacion ${numeroHabitacion}`,
                  text: `email de prueba de reserva`,
                  html: `
                  <div>
                    <h1>Gracias por su reserva ${valores.nombre}</h1>
                  </div>
                  <div>
                    <p>Datos de la reserva:</p>
                    <div>
                      <ul>
                        <li>Numero de habitacion: ${valores.numeroHabitacion}</li>
                        <li>Fecha de entrada: ${valores.fechaEntrada}</li>
                        <li>Fecha de Salida: ${valores.fechaSalida}</li>
                        <hr style="height:2px;border-width:0;color:gray;background-color:gray">
                        <br>
                        <li>Nombre: ${valores.nombre}</li>
                        <li>Apellidos: ${valores.apellidos}</li>
                        <li>Email: ${valores.emailInput}</li>
                        <li>DNI/NIE/NIF/Pasaporte: ${valores.identificacion}</li>
                        <li>Telefono: ${valores.telefono}</li>
                        <li>Huespedes: ${valores.huespedes}</li>
                      </ul>
                    </div>
                  </div>
                  `,
                },
                (err, info) => {
                  if (err)
                    return res.status(500).json({ message: err.message });
                  res.json({ success: true });
                }
              ),
              res
                .status(200)
                .json({ message: "Habitacion reservada con exito" }))
            : res.status(500).json({
                message: "Error al reservar habitacion, intentelo de nuevo",
              });
        });
      } else {
        console.log("entra en el else");
        const clienteAnadido = await addCliente(valores).then(
          async (cliente) => {
            if (cliente) {
              const reserva = await reservarHabitacion(
                valores,
                numeroHabitacion
              ).then((resultadoReserva) => {
                return resultadoReserva
                  ? (mailer.sendMail(
                      {
                        from: "Hostal App Reservas <reservas.hostalapp@gmail.com>",
                        to: `${valores.emailInput},reservas.hostalapp@gmail.com`,
                        subject: `${valores.nombre} ${valores.apellidos}: Reserva habitacion ${numeroHabitacion}`,
                        text: `email de prueba de reserva`,
                        html: `
                  <div>
                    <h1>Gracias por su reserva ${valores.nombre}</h1>
                  </div>
                  <div>
                    <p>Datos de la reserva:</p>
                    <div>
                      <ul>
                        <li>Numero de habitacion: ${valores.numeroHabitacion}</li>
                        <li>Fecha de entrada: ${valores.fechaEntrada}</li>
                        <li>Fecha de Salida: ${valores.fechaSalida}</li>
                        <hr style="height:2px;border-width:0;color:gray;background-color:gray">
                        <br>
                        <li>Nombre: ${valores.nombre}</li>
                        <li>Apellidos: ${valores.apellidos}</li>
                        <li>Email: ${valores.emailInput}</li>
                        <li>DNI/NIE/NIF/Pasaporte: ${valores.identificacion}</li>
                        <li>Telefono: ${valores.telefono}</li>
                        <li>Huespedes: ${valores.huespedes}</li>
                      </ul>
                    </div>
                  </div>
                  `,
                      },
                      (err, info) => {
                        if (err)
                          return res.status(500).json({ message: err.message });
                        res.json({ success: true });
                      }
                    ),
                    res
                      .status(200)
                      .json({ message: "Habitacion reservada con exito" }))
                  : res.status(500).json({
                      message:
                        "Error al reservar habitacion, intentelo de nuevo",
                    });
              });
            } else {
              return res.status(500).json({
                message:
                  "Error al procesar los datos suministrados. Vuelva a intentarlo mas adelante",
              });
            }
          }
        );
      }
    });
  } catch (e) {
    console.log("error: ", e);
  }
});

module.exports = router;
