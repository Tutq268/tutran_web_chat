import nodeMailer from 'nodemailer'



let sendMail = (to, subject, htmlContent) => {
  
   let transporter = nodeMailer.createTransport({
     host: "smtp.gmail.com",
     port: 587,
     secure: false,
     auth: {
      user: "trantu.hn1996001@gmail.com",
      pass: "anhnhoem123"
     }
   })

   let options = {
     from: "trantu.hn1996001@gmail.com",
     to: to,
     subject: subject,
     html: htmlContent
   }
   return transporter.sendMail(options)
}
module.exports = sendMail