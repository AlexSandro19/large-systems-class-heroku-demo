const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const User = require("./model/User")
const Furniture = require("./model/Furniture")

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/orders", require("./routes/orders.routes"));
app.use("/api", require("./routes/contact.routes"));
app.use("/api", require("./routes/items.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}else {
  app.get("/", (req, res) => {
    res.send("Api running")
  })
}

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected to Mongo");
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    process.exit(1);
  }
  mongoose.connection.on('error', err => {
    logError(err);
  });
  // mongoose.connection.on('disconnected', err => {
  //   logError(err);
  // });

}

start();
