const nodemailer = require("nodemailer");


const sendEmail = async ({email, subject, html}) => {
    try {
    let transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        auth: {
            user: "6aed16428bc547",
            pass: "f814134d887a6b"
        },
        secureConnection: 'false',
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    }
    });

    await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: "Hello world?", // plain text body
        html: html, // html body
    });
    } catch (err) {
        res.json({message: `${err}`})
    }

}

module.exports = sendEmail;