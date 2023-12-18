const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: "*", // Allow requests from any origin
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
require("dotenv").config();
app.use(express.json());
const bookRouter = require("./routes/bookRouter");
app.use("/api/v1/Yoga", bookRouter);
app.listen(process.env.PORT, (req, res) => console.log("server is up"));
