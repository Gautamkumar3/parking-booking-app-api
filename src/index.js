const express = require("express");
const dbConnect = require("./config/db");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const userRouter = require("./route/user");
const reservationRouter = require("./route/reservation");
const slotRouter = require("./route/slot");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/reservation", reservationRouter);
app.use("/slot", slotRouter);

app.get("/", (req, res) => {
  res.send("Welcome to GK Parking booking app");
});

app.listen(PORT, async (req, res) => {
  await dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
