const express = require("express");
const router = express.Router();

const bookController = require("../controller/bookController");
router.get("/", bookController.getAll);
router.post("/batch", bookController.getBatch);
router.post("/user", bookController.getById);
router.post("/", bookController.createUser);
router.post("/update/batch", bookController.updateBatch);
router.post("/update/payment", bookController.updatePay);
module.exports = router;
