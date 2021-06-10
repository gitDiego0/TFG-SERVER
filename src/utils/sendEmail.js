const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "noreply.hostalapp@gmail.com",
    pass: "258852__",
  },
});

exports.sendEmail = async (
  emailFrom,
  emailTo,
  nombre,
  apellidos,
  subject,
  mensaje
) => {
  const status = {
    message: "",
    code: 0,
  };

  const mail = {
    from: emailFrom,
    to: emailTo,
    subject: `${nombre} ${apellidos}: ${subject}`,
    text: `${mensaje}`,
    html: `<b>${mensaje}</b><br><br>${emailTo}`,
  };
  return mailer.sendMail(mail, (err, info) => {
    if (err) {
      status.code = 500;
      status.message = err.message;
      console.log("status error: ", status);
      return status;
    } else {
      status.code = 200;
      status.message = "success";
      console.log("status success: ", status);
      return status;
    }
  });
  console.log("status antes de enviar: ", status);
  return status;
};
