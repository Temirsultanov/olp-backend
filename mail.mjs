import nodemailer from "nodemailer";
import path from "node:path";

const MAIL = "test350350350@gmail.com";
const PASSWORD = "dnbf kviw bfpi wmnr"
const DESTINATION_MAIL = "temirsultanov.dev@gmail.com"

const mailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: MAIL,
    pass: PASSWORD,
  }
})

const mailResponseHandler = (err) => {
  if (err) {
    console.error(err);
  }
}

const TYPES = {
  cost: "Запрос стоимости",
  consultation: "Запрос на консультацию",
  call: "Запрос на обратный звонок",
  support: "Запрос службы поддержки"
}

const fromDataToHTML = {
  cost: (type, data) => (`
    <h2 style="color: black">${type}</h2>
    <p style="margin: 0; color: black">Имя: ${data.name}</p>
    <p style="margin: 0; color: black">Фамилия: ${data.surname}</p>
    <p style="margin: 0; color: black">Электронная почта: ${data.email}</p>
    <p style="margin: 0; color: black">Услуга: ${data.service}</p>
  `),
  consultation: (type, data) => (`
  <h2 style="color: black">${type}</h2>
    <p style="margin: 0; color: black">Имя: ${data.name}</p>
    <p style="margin: 0; color: black">Телефон: ${data.phone}</p>
  `),
  call: (type, data) => (`
  <h2 style="color: black">${type}</h2>
    <p style="margin: 0; color: black">Имя: ${data.name}</p>
    <p style="margin: 0; color: black">Телефон: ${data.phone}</p> 
  `),
  support: (type, data) => (`
    <h2 style="color: black">${type}</h2>
    <p style="margin: 0; color: black">Имя: ${data.name}</p>
    <p style="margin: 0; color: black">Электронная почта: ${data.email}</p>
    <p style="margin: 0; color: black">Описание проблемы: ${data.description}</p>
  `)
}

export const sendMail = (url, data) => {
  if (!TYPES[url]) return;

  const mailDetails = {
    from: MAIL,
    to: DESTINATION_MAIL,
    subject: `Заявка с сайта OLP: ${TYPES[url]}`,
    html: fromDataToHTML[url](TYPES[url], data)
  }

  if (data.file) {
    mailDetails.attachments = [{
      filename: data.fileName,
      content: data.fileContent,
      encoding: "base64"
    }]
  }

  console.log(mailDetails);

  mailTransporter.sendMail(mailDetails, mailResponseHandler);
}