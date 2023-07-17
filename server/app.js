const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const studentRoutes = require("./routes/student");
const adminRoutes = require("./routes/admin");
const Admin = require("./models/admin");
const createSuperAdmin = require("./utils/createSuperAdmin");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection Success.");
    checkSuperAdmin();
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/", () => {
  console.log("get working");
});

app.listen(process.env.PORT, () => {
  console.log("Server started listening on PORT : " + process.env.PORT);
});

async function checkSuperAdmin() {
  try {
    const superAdmin = await Admin.findOne({ role: "superadmin" });

    if (!superAdmin) {
      // Create the super admin if it doesn't exist
      await createSuperAdmin();
    } else {
      console.log("Super admin already exists.");
    }
  } catch (error) {
    console.error("Error checking super admin:", error);
  }
}
