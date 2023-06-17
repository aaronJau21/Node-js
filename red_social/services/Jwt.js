// Importaciones
const jwt = require("jsonwebtoken");
const moment = require("moment");

const secret = process.env.SECRET_KEY;
const expiresIn = moment().add(30, "days").unix();

const createToken = (uid,name,surname, nick, email, role,image) => {
  try {
    const token = jwt.sign({ uid,name,surname, nick, email, role,image}, secret, { expiresIn });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createToken,
};
