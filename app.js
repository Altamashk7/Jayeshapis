const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: "jayesh",
});

const productsRouter = require("./routers/products");

//routes

app.use("/product", productsRouter);

app.get("/", (req, res) => {
  res.send("API working fine !");
});

app.listen(process.env.PORT || "3000", () => console.log("Server is running"));
