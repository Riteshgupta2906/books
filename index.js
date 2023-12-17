const express = require("express");
const app = express();

require("dotenv").config();
app.use(express.json());
const bookRouter = require("./routes/bookRouter");
app.use("/api/v1/books", bookRouter);
app.listen(process.env.PORT, (req, res) => console.log("server is up"));
