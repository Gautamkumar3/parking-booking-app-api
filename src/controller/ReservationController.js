const ReservationModal = require("../modal/reservation");
const SlotModal = require("../modal/slot");

const createReservation = async (req, res) => {
  try {
    const newReservation = new ReservationModal({
      ...req.body,
      user: req.userId,
    });
    await newReservation.save();
    return res.status(200).send({
      status: "success",
      message: "Reservation created successfully",
      data: newReservation,
    });
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};

const getReservationData = async (req, res) => {
  let id = req.userId;
  try {
    const reservationData = await ReservationModal.find({ user: id });
    return res.status(200).send({
      status: "success",
      message: "Reservation data get successfully",
      data: reservationData,
    });
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};

const canceReservation = async (req, res) => {
  const { id } = req.params;
  try {
    let reservation = await ReservationModal.findById(id);
    if (!reservation) {
      return res
        .status(400)
        .send({ status: "error", message: "Reservation not found" });
    }
    let slot = await SlotModal.findOne({ _id: reservation.slotId });
    if (!slot) {
      return res
        .status(400)
        .send({ status: "error", message: "Slot not found" });
    }
    if (reservation.status === "Booked") {
      reservation.status = "Cancelled";
      reservation.save();
      slot.status = "available";
      slot.save();
      return res
        .status(200)
        .send({
          status: "success",
          message: "Reservation cancel successfully",
        });
    } else {
      return res.status(400).send({
        status: "error",
        message: "Reservation is already cancelled",
      });
    }
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};
module.exports = {
  createReservation,
  getReservationData,
  canceReservation,
};
