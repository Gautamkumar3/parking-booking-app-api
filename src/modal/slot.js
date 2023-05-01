const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  slotNo: {
    type: Number,
    required: [true, "Slot number is required"],
    enum: [1, 2, 3],
  },
  status: {
    type: String,
    enum: ["available", "booked"],
    default: "available",
  },
  bookedFromDate: {
    type: Date,
    required: true,
  },
  bookedTill: {
    type: Date,
    required: true,
  },
  price: { type: Number, required: [true, "Price is missing"] },
});

slotSchema.pre("validate", function (next) {
  if (this.bookedFromDate >= this.bookedTill) {
    const err = new Error("book from date must be less than book till date");
    next(err);
  }
  next();
});

const Slot = mongoose.model("slot", slotSchema);

module.exports = Slot;
