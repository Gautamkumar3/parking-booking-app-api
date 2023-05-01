const express = require("express");
const {
  createSlot,
  getAllAvilableSlot,
  getAllSlot,
  bookSlot,
  cancelSlot,
} = require("../controller/slotControler");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const slotRouter = express.Router();

slotRouter.post("/create", createSlot);
slotRouter.get("/avilable", getAllAvilableSlot);
slotRouter.get("/all", getAllSlot);
slotRouter.post("/book/:id", AuthMiddleware, bookSlot);
slotRouter.post("/cancel/:id", AuthMiddleware, cancelSlot);

module.exports = slotRouter;
