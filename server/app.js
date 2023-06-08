const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/users");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection Success.");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/v1", authRoutes);

app.get("/", () => {
  console.log("get working");
});

app.listen(process.env.PORT, () => {
  console.log("Server started listening on PORT : " + process.env.PORT);
});
