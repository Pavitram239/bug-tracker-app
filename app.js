require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Bug = require("./models/bug");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const bugs = await Bug.find();
  res.render("bugtemplate", { bugs: bugs });
});

app.post("/submit", async (req, res, next) => {
  await Bug.create(req.body);
  res.redirect("/");
});

const PORT = process.env.PORT || 5100;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("connected to server");
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
