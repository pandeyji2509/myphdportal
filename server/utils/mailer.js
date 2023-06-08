require("dotenv").config();
const nodemailer = require("nodemailer");
const { otpModel } = require("../models/Otp");
const { hashPassword } = require("./bycrpt");

const getHrTime = () => {
  var datetime = new Date(Date.now());
  console.log("Before: ", datetime);
  datetime.setHours(datetime.getHours() + 1);
  console.log("After: ", datetime);
  return datetime;
};

const sendOtpEmail = async (email, _id) => {
  // The body of the email for recipients

  const transporter = nodemailer.createTransport({
    // host: "smtp-mail.outlook.com", // hostname
    service: "gmail",
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });

  try {
    const code = `${Math.floor(1000 + Math.random() * 9000)}`;
    var body_html = `<!DOCTYPE> 
    <html>
      <body>
        <p>Your authentication code is : </p> <b>${code}</b>
      </body>
    </html>`;

    let mailOptions = {
      from: process.env.EMAIL_USER, // sender address
      to: email, // list of receivers
      subject: "Verify Your Account", // Subject
      html: body_html,
    };
    const hashedOtp = await hashPassword(code);

    const newOtp = await otpModel.create({
      entityId: _id,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: getHrTime(),
    });

    await transporter.sendMail(mailOptions);

    return {
      status: "Pending",
      message: "Verification Otp email sent",
      data: {
        userId: _id,
        email,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendOtpEmail };
