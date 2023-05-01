const express = require("express");
const {
  registerUser,
  userLogin,
  allBookedAndCancelledSlot,
} = require("../controller/userControler");

const userRouter = express.Router();


userRouter.get("/all/reservation", allBookedAndCancelledSlot);
userRouter.post("/register", registerUser);
userRouter.post("/login", userLogin);

module.exports = userRouter;
