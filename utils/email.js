const nodemailer = require("nodemailer");
// const contentNegotiation = require("./contentNegotiation")

async function createTransporter() {
    let transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.EMAIL_USERNAME}`,
            pass: `${process.env.EMAIL_PASSWORD}`
        }
    });
    return transporter ;
}


exports.sendWelcomeEmail = async (req) => {
    let transporter = await createTransporter();
    let mailOptions = {
        from: `${process.env.EMAIL_USERNAME}`,
        to: `${req.body.email}`,
        subject: 'Welcome to the family !!',
        text: `Hi ${req.body.username} , Now You can share your knowledge with us`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}