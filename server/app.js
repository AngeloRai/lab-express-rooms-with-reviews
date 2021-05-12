const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = 4000;

const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

const db = require("./config/db.config.js");
db();

const roomRouter = require("./routes/room.routes");
app.use("/", roomRouter);

const reveiwRouter = require("./routes/reviews.routes");
app.use("/", reveiwRouter);

app.listen(Number(PORT), () =>
  console.log(`Server up and running at port ${PORT}`)
);
