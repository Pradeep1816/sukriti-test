const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { createJwt } = require("../services/jwt");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "All fields are required" });
    }
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res
        .status(200)
        .send({ success: true, message: "User Already Exist" });
    }

    const hashpass = bcrypt.hashSync(password, +process.env.SALT);

    const user = await new User({
      name,
      email,
      password: hashpass,
    });
    user.save();
    const token = createJwt({ email, password });
    console.log(token);
    res.status(200).send({ success: true, message: "User Registered", token });
  } catch (error) {
    res.status(500).send({ success: false, message: "Failed to signup" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "All fields are require" });
    }

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(400).send({ success: false, message: "use not exist" });
    }

    const isValid = bcrypt.compareSync(password, user.password);
    console.log(isValid);

    if (!isValid) {
      return res.status(404).send("password not match");
    }
    const token = createJwt({ email, password: user.password });

    res.status(200).send({ success: true, message: "login successful", token });
  } catch (error) {
    res.status(500).send({ success: false, message: "Login Failed", error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (users.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "No users found" });
    }

    res.status(200).send({ success: true, data: users });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Failed to retrieve users", error });
  }
};

exports.delete = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.edit = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
