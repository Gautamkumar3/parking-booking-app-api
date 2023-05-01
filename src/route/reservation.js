const express = require("express");
const {
  createReservation,
  getReservationData,
  canceReservation,
} = require("../controller/ReservationController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const reservationRouter = express.Router();

reservationRouter.post("/create", AuthMiddleware, createReservation);
reservationRouter.get("/all", AuthMiddleware, getReservationData);
reservationRouter.post("/cancel/:id", AuthMiddleware, canceReservation);

module.exports = reservationRouter;
