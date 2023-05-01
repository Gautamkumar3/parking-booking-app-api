const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  slotNo: {
    type: Number,
    required: [true, "Slot number is required"],
    enum: [1, 2, 3],
  },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "slot", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  bookedFromDate: {
    type: Date,
    required: [true, "bookedFromDate is missing"],
  },
  bookedTill: { type: Date, required: [true, "bookedTill is missing"] },
  status: {
    type: String,
    enum: ["Booked", "Cancelled"],
  },
  price: { type: Number, required: [true, "Price is missing"] },
});

reservationSchema.pre("validate", function (next) {
  if (this.bookedFromDate >= this.bookedTill) {
    const err = new Error("book from date must be less than book till date");
    next(err);
  }
  next();
});

const Reservation = mongoose.model("reservation", reservationSchema);
module.exports = Reservation;
