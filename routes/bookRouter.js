const express = require("express");
const router = express.Router();

const bookController = require("../controller/bookController");
router.get("/", bookController.getAll);
router.post("/", bookController.create);
module.exports = router;
