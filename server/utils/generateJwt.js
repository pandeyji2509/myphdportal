const jwt = require("jsonwebtoken");
require("dotenv").config();

const options = {
  expiresIn: "1h",
};

async function generateJwt(email, userId) {
  try {
    const payload = { email: email, id: userId };
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);
    return token;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { generateJwt };
