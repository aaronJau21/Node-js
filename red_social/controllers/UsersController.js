const User = require("../models/User.js");
const bcryptjs = require("bcryptjs");
const mongoosePaginate = require("mongoose-pagination");

const { createToken } = require("../services/Jwt.js");

// Registrar usuario
const register = async (req, res) => {
  const params = req.body;

  try {
    if (!params.name || !params.email || !params.password || !params.nick) {
      return res.status(400).json({
        msg: "Faltan datos",
      });
    }

    let user = await User.findOne({ email: params.email });
    if (user) throw { code: 11000 };

    user = new User(params);

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(user.password, salt);
    user.password = hash;

    await user.save();

    return res.status(200).json({
      status: "success",
      msg: "Se registro correctamente",
      params,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe este usuario" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

const login = async (req, res) => {
  const params = req.body;

  if (!params.email || !params.password) {
    return res.status(400).json({
      status: "error",
      msg: "Faltan datos por enviar",
    });
  }

  const user = await User.findOne({ email: params.email }).select({
    created_ar: 0,
    _id: 0,
    __v: 0,
  });
  if (!user) {
    return res.status(404).json({
      status: "error",
      msg: "El email no existe",
    });
  }

  const pwd = await bcryptjs.compare(params.password, user.password);

  if (!pwd) {
    return res.status(400).json({
      status: "error",
      msg: "No te as identificado correctamente",
    });
  }

  const token = createToken(
    User.id,
    user.name,
    user.surname,
    user.nick,
    user.email,
    user.role,
    user.image
  );

  return res.status(200).json({
    ok: "Login",
    msg: "Te as identificado correctamente",
    user: {
      id: user.id,
      name: user.name,
      nick: user.nick,
    },
    token,
  });
};

const profile = async (req, res) => {
  const id = req.params.id;

  try {
    const user_id = await User.findById(id).select({
      role: 0,
      password: 0,
    });

    if (!user_id) return;

    return res.status(200).send({
      status: "success",
      user: user_id,
    });
  } catch (error) {
    // console.log(error);
    return res.status(404).send({
      status: "error",
      msg: "El usuario no existe",
    });
  }
};

const list = async (req, res) => {
  let page = 1;
  if (req.params.page) {
    page = parseInt(req.params.page);
  }

  const items = 3;

  const skip = (page - 1) * items;

  let users = await User.find().sort("_id");
  let userTotal = users.length;

  let itemsPerPage = await User.find().sort("_id").skip(skip).limit(items);

  const total = itemsPerPage.length;

  if (!itemsPerPage) {
    return res.status(404).send({
      status: "success",
      msg: "No hay usuarios",
    });
  }

  return res.status(200).send({
    status: "success",
    itemsPerPage,
    page,
    total,
    pages: Math.ceil(userTotal / total),
  });
};

const update = async (req, res) => {
  let userUpdate = req.user;

  delete userUpdate.iat;
  delete userUpdate.exp;
  delete userUpdate.role;
  delete userUpdate.image;

  try {
    let user = await User.findOne({ email: params.email });
    if (user) throw { code: 11000 };

    user = new User(params);

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(user.password, salt);
    user.password = hash;

    await user.save();

    return res.status(200).json({
      status: "success",
      msg: "Se registro correctamente",
      params,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe este usuario" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

module.exports = {
  register,
  login,
  profile,
  list,
  update,
};
