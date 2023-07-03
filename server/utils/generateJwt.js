const jwt = require("jsonwebtoken");
require("dotenv").config();

async function generateJwt(emailId, userId, expiryTime, secret) {
  const options = {
    expiresIn: expiryTime,
  };
  try {
    const payload = { email: emailId, id: userId };
    const token = jwt.sign(payload, secret, options);
    return token;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { generateJwt };
