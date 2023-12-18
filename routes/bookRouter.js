const express = require("express");
const router = express.Router();

const bookController = require("../controller/bookController");
router.get("/", bookController.getAll);
router.post("/user", bookController.getById);
router.post("/", bookController.createUser);
router.patch("/user", bookController.updateBatch);
router.patch("/payment", bookController.updatePay);
module.exports = router;
