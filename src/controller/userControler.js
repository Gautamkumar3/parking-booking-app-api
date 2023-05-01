const UserModal = require("../modal/user");
const SlotModal = require("../modal/slot");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({
      status: "error",
      message: "User name or Email or password is missing",
    });
  }
  try {
    let user = await UserModal.findOne({ email });
    if (user) {
      return res.status(409).send({
        status: "error",
        message:
          "This email is registered with the other user please try with another email",
      });
    } else {
      let newUser = new UserModal({ name, email, password });
      await newUser.save();
      return res.status(200).send({
        status: "success",
        message: "You are successfully registered.",
      });
    }
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ status: "error", message: "Email or password is missing" });
  }
  try {
    const user = await UserModal.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ status: "error", message: "Invalid Credentials" });
    } else {
      const matchUser = await bcrypt.compare(password, user.password);
      if (matchUser) {
        let token = jwt.sign(
          { id: user._id, email: user.email, name: user.name, role: user.role },
          secretKey,
          {
            expiresIn: "1 day",
          }
        );
        return res.status(200).send({
          status: "success",
          message: "Login successfull",
          token: token,
          name: user.name,
        });
      } else {
        return res
          .status(400)
          .send({ status: "error", message: "Invalid Credentials" });
      }
    }
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};

const allBookedAndCancelledSlot = async (req, res) => {
  try {
    let allData = await UserModal.find({})
      .populate("booked.slotId")
      .populate("cancelled.slotId")
      .select({ _id: 0, name: 1, booked: 1, cancelled: 1 });

    return res.status(200).send({
      status: "success",
      message: "Get all users data successfully",
      data: allData,
    });
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};

module.exports = { registerUser, userLogin, allBookedAndCancelledSlot };
