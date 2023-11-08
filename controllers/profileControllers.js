const asyncHandler = require("express-async-handler");
const Profile = require("../models/profileModel")

const userProfile = asyncHandler(async (req, res) => {
    try {
        Profile.findOne({ sender: req.params.userId })
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const createProfile = asyncHandler(async (req, res) => {

    const profileExists = await Profile.findOne({ sender: req.user._id });

    if (profileExists) {
        res.status(400);
        throw new Error("Profile already exists.");
    }

    const { gender, dob, age, mobile } = req.body;

    if (!gender || !dob || !age || !mobile) {
        res.status(400);
        throw new Error("Please enter all fields");
    }


    const profile = await Profile.create({
        sender: req.user._id,
        gender: gender,
        dob: dob,
        age: age,
        mobile: mobile,
    });

    if (profile) {
        res.status(201).json({
            _id: profile._id,
            gender: profile.gender,
            dob: profile.dob,
            age: profile.age,
            mobile: profile.mobile
        });
    } else {
        res.status(400);
        throw new Error("Cant create profile.");
    }
});


const userProfileUpdate = asyncHandler(async (req, res) => {
    let profile = await Profile.findOneAndUpdate({ sender: req.user._id },
        { $set: { ...req.body } }, { new: true })
    if (!profile) {
        res.status(400);
        throw new Error('No such profile found');
    } else {
        return res.status(200).send({
            message: 'Successfully updated',
            data: profile
        })
    }

})
module.exports = { userProfile, createProfile,userProfileUpdate };
