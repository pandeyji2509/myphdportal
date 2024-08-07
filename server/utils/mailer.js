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

const send_forget_password_email = async (email, _id, link) => {
  const transporter = nodemailer.createTransport({
    // host: "smtp-mail.outlook.com", // hostname
    service: "gmail",
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });

  try {
    var body_html = `<!DOCTYPE> 
    <html>
      <body>
        <p><a href=${link}>Click here </a>to reset your password</p>
      </body>
    </html>`;

    let mailOptions = {
      from: process.env.EMAIL_USER, // sender address
      to: email, // list of receivers
      subject: "Reset your password", // Subject
      html: body_html,
    };

    await transporter.sendMail(mailOptions);

    return {
      status: "success",
      message: "Forget password email sent",
      data: {
        userId: _id,
        email,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

const send_date_time = async (email, _id) => {
  const { date, time } = req.body;
  const dateTime = `${date} ${time}`;
  const scheduledTime = new Date(dateTime);
  const formattedScheduledTime = scheduledTime.toLocaleString(); // Eg : '15/7/2023, 2:30:00 pm'

  const transporter = nodemailer.createTransport({
    // host: "smtp-mail.outlook.com", // hostname
    service: "gmail",
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });

  try {
    var body_html = `<!DOCTYPE> 
    <html>
      <body>
        <p>Scheduled time is : </p> <b>${formattedScheduledTime}</b> 
      </body>
    </html>`; // Message is to be edited accordingly

    let mailOptions = {
      from: process.env.EMAIL_USER, // sender address
      to: email, // list of receivers
      subject: "Date and time", // Subject
      html: body_html,
    };

    await transporter.sendMail(mailOptions);

    return {
      status: "success",
      message: "Email sent successfully",
      data: {
        userId: _id,
        email,
      },
    };
  } catch (error) {
    console.log(error);
  }
}



const sendPasswordEmail = async(userEmail, password,department, _id) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });

  try {

    var body_html = `<!DOCTYPE> 
    <html>
      <body>

        <p>Congratulations! After careful consideration of your application and qualifications, we are pleased to inform you that you have been selected for admission to our prestigious PhD program offered by the department of ${department}. <p>

        <p>You can now login to the portal using below mentioned credentials<p>
        <p>Your Username : <b>${userEmail}</b> </p> 
        <p>Your Password : <b>${password}</b> </p> 
      </body>
    </html>`;
    // Email content
    let mailOptions = {
      from: process.env.AUTH_USER, // sender address
      to: userEmail,
      subject: 'PU PhD Portal Password',
      html: body_html,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    
    return {
      error: false,
      message: "Password email sent successfully",
      data: {
        userId: _id,
      },
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return{
      error: true,
      message: "Couldn't send the password email",
    }
  }
}

const sendFeeRequest = async(userEmail, firstName, enrollmentNumber, department, _id) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });

  try {

    var body_html = `<!DOCTYPE> 
    <html>
      <body>
        <p> Dear ${firstName}, </p>
        <p>Your application has been approved by ${department}. <p>

        <p>You can now pay the enrollment fee and upload the receipt of the same on the portal for registration.<p>
        <p>Your Enrollment Number : <b>${enrollmentNumber}</b> </p> 
      </body>
    </html>`;
    // Email content
    let mailOptions = {
      from: process.env.AUTH_USER, // sender address
      to: userEmail,
      subject: 'Fee Upload - PhD Registration',
      html: body_html,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    
    return {
      error: false,
      message: "Request email sent successfully",
      data: {
        userId: _id,
      },
    };
  } catch (error) {
    console.error('Error sending request:', error);
    return{
      error: true,
      message: "Couldn't send the request email",
    }
  }
}

const sendInteractionInvite = async(userEmail, date , time, venue, _id) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });

  try {

    var body_html = `<!DOCTYPE> 
    <html>
      <body>

        <p>We are pleased to inform you that you have been selected for offline faculty iteraction meet. <p>

        <p>Meet date: ${date}</p> 
        <p>Meet venue: ${venue}<p>
        <p>Meet time: ${time}</p> 
        
      </body>
    </html>`;
    // Email content
    let mailOptions = {
      from: process.env.AUTH_USER, // sender address
      to: userEmail,
      subject: 'Offline Meet Invite',
      html: body_html,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    
    return {
      error: false,
      message: "Meet invite sent successfully",
      data: {
        userId: _id,
      },
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return{
      error: true,
      message: "Couldn't send the meet invite email",
    }
  }
}


module.exports = { sendOtpEmail, send_forget_password_email, sendPasswordEmail,sendInteractionInvite, sendFeeRequest };
