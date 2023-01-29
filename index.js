require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./config/mongoose");
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// use express router
app.use("/", require("./routes"));
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
