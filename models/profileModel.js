const mongoose = require("mongoose");

const profileModel = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        gender: {
            type: String,
            required: true,
            enum: "Male" || "Female"
        },
        dob: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        mobile: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const Profile = mongoose.model("Profile", profileModel);

module.exports = Profile;