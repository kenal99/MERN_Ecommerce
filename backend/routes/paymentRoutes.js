const express = require("express");
const { addPayment } = require("../controllers/paymentController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.route("/:id").post(protect, addPayment);

module.exports = router;
