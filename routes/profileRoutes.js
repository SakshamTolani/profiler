const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { userProfile, createProfile,userProfileUpdate } = require("../controllers/profileControllers");


router.route("/create").post(protect, createProfile)
router.route("/:userId").get(userProfile);
router.route("/update").put(protect, userProfileUpdate);


module.exports = router;