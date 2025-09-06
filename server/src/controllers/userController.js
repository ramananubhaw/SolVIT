import users from "../models/users.js";
import complaints from "../models/complaints.js";
import hashPassword from "../middlewares/hashPassword.js";
import verifyPassword from "../middlewares/verifyPassword.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// @method POST
// @route /api/users/register
// @access PUBLIC (user)
// @request body {name, reg_no, email_id, phone_no, block, room_no, password}
export const registerUser = async (req,res) => {
    try {
        let {name, reg_no, email_id, phone_no, block, room_no, password} = req.body;
        const user = await users.findOne({reg_no: reg_no.toUpperCase()})
        if (user) {
            res.status(400).json({message: "User already exists."});
            return;
        }
        const hashedPassword = await hashPassword(password);
        reg_no = reg_no.toUpperCase();
        await users.create({name, reg_no, email_id, phone_no, block, room_no, hashedPassword});
        res.status(201).json({message: "User registered successfully."});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error."});
        throw error;
    }
};

// @method POST
// @route /api/users/login
// @access PUBLIC (user)
// @request body {email_id, password}
export const loginUser = async (req,res) => {
    try {
        const {email_id, password} = req.body;
        if (!email_id || !password) {
            res.status(400).json({message: "All fields are mandatory"});
            return;
        }
        const user = await users.findOne({email_id: email_id});
        if (!user) {
            res.status(400).json({message: "User does not exist."});
            return;
        }
        const verified = await verifyPassword(password, user.hashedPassword);
        if (!verified) {
            res.status(400).json({message: "Invalid credentials."});
            return;
        }
        const accessToken = jwt.sign({
            data: {
                username: user.reg_no,
                email_id: user.email_id,
                id: user._id,
                role: "user"
            }
        }, process.env.SECRET_ACCESS_TOKEN, {
            expiresIn: process.env.JWT_TOKEN_EXPIRY_TIME // increase expiration time for JWT token in production
        });
        res.cookie("access_token", accessToken, {
            // httpOnly: true,
            // secure: true,
            sameSite: "strict",
            // maxAge: process.env.AUTHENTICATION_COOKIE_EXPIRY_TIME // increase expiration time of cookie in production
        }); // enable the httpOnly and secure flags in production
        res.status(200).json({message: "Logged in successfully."});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error."});
    }
};

// @method POST
// @route /api/users/logout
// @access PRIVATE (user)
export const logoutUser = (req,res) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json({message: "Logged out successfully."});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Error logging out."});
    }
};

// @method GET
// @route /api/users/current
// @access PRIVATE (user)
export const currentUser = async (req,res) => {
    try {
        if (!req.decoded || req.decoded.data.role!="user") {
            res.status(403).json({message: "Access denied, users only."});
            return;
        }
        const username = req.decoded.data.username;
        const email_id = req.decoded.data.email_id;
        const user = await users.findOne({reg_no: username, email_id: email_id}).select({"_id":0, "hashedPassword":0, "__v":0})
        res.status(200).json({
            message: "Current User details.",
            user: user
        });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
};

// @method PUT
// @route /api/users/update
// @access PRIVATE (user)
// @request body {fields to be updated}
export const updateUser = async (req,res) => {
    try {
        if (!req.decoded || req.decoded.data.role!="user") {
            res.status(403).json({message: "Access denied, users only."});
            return;
        }
        if (req.body.password || req.body.reg_no) {
            res.status(400).json({message: "Registration Number and Password cannot be updated here."});
            return;
        }
        const reg_no = req.decoded.data.username;
        const keys = Object.keys(req.body);
        let projection = {};
        keys.forEach((key) => {
            projection[key] = 1
        });
        projection["_id"] = 0; // user cannot update user id.
        const user = await users.findOne({reg_no: reg_no}).select(projection);
        if (!user) {
            res.status(404).json({message: "User not found."});
            return;
        }
        let same = true;
        let update = {};
        for (const key of keys) {
            if (user[key] === req.body[key]) {
                // console.log("Same - " + key + ": " + user[key] + ", " + req.body[key]);
                continue;
            }
            // console.log("Different - " + key + ": " + user[key] + ", " + req.body[key]);
            same = false;
            update[key] = req.body[key];
        }
        if (same) {
            res.status(400).json({message: "Already up-to-date."});
            return;
        }
        // console.log(update);
        const updatedUser = await users.findOneAndUpdate({reg_no: reg_no}, update, {new: true}).select({"_id":0, "hashedPassword":0, "__v":0});
        res.status(200).json({message: "User data updated successfully.", user: updatedUser});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error."});
    }
};

// @method GET
// @route /api/users/complaints/details
// @access PRIVATE (user)
export const getAllComplaints = async (req, res) => {
    try {
        if (!req.decoded || req.decoded.data.role!="user") {
            res.status(403).json({message: "Access denied, users only."});
            return;
        }
        const reg_no = req.decoded.data.username;
        const allComplaints = await complaints.find({reg_no: reg_no}).select("-__v");
        res.status(200).json({
            message: "All complaints by user retrieved successfully.",
            complaints: allComplaints,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// @method POST
// @route /api/users/complaints/register
// @access PRIVATE (user)
// @request body {category, complaint}
export const registerComplaint = async (req,res) => {
    try {
        if (!req.decoded || req.decoded.data.role!="user") {
            res.status(403).json({message: "Access denied, users only."});
            return;
        }
        // const user_id = req.decoded.data.id;
        const reg_no = req.decoded.data.username;
        const user = await users.findOne({reg_no: reg_no}).select({block:1, room_no:1});
        // console.log(user);
        const {category, complaint} = req.body;
        const check = await complaints.findOne({reg_no: reg_no, block: user.block, category: category, complaint: complaint});
        if (check) {
            if (check.status=="pending") {
                return res.status(400).json({message: "Complaint already registered."});
            }
            return res.status(400).json({message: "Complaint already registered and resolved."});
        }
        const block = user.block;
        const room_no = user.room_no;
        await complaints.create({reg_no, block, room_no, category, complaint});
        res.status(201).json({message: "Complaint registered successfully."});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error."});
    }
};

// @method PUT
// @route /api/users/complaints/update
// @access PRIVATE (user)
// @request body {category, complaint}
// @request query {id}
export const updateComplaint = async (req,res) => {
    try {
        if (!req.decoded || req.decoded.data.role!="user") {
            res.status(403).json({message: "Access denied, users only."});
            return;
        }
        const {id} = req.query;
        const reg_no = req.decoded.data.username;
        const block = req.decoded.data.block;
        const room_no = req.decoded.data.room_no;
        const {category, complaint, status} = req.body;
        
        const registeredComplaint = await complaints.findOne({_id: id, reg_no: reg_no});
        if (!registeredComplaint) {
            return res.status(404).json({message: "Complaint not found."});
        }
        if (registeredComplaint.status=="solved") {
            return res.status(400).json({message: "Solved complaints can't be updated."});
        }

        const updateData = {};
        if (category) updateData.category = category;
        if (complaint) updateData.complaint = complaint;
        if (status) updateData.status = status;

        const updatedComplaint = await complaints.findOneAndUpdate(
            {_id: id, reg_no: reg_no, block: block, room_no: room_no}, 
            updateData, 
            {new: true}
        );
        res.status(200).json({
            message: "Complaint updated successfully.",
            complaint: updatedComplaint
        });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error."});
    }
};

// @method DELETE
// @route /api/users/complaints/delete
// @access PRIVATE (user)
// @request params {id}
export const deleteComplaint = async (req, res) => {
    try {
        if (!req.decoded || req.decoded.data.role!="user") {
            res.status(403).json({message: "Access denied, users only."});
            return;
        }
        const { id } = req.query;
        console.log(id);
        const reg_no = req.decoded.data.username;
        // console.log(reg_no)
        const complaint = await complaints.findOne({_id: id, reg_no: reg_no});
        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found." });
        }
        if (complaint.status=="solved") {
            return res.status(400).json({message: "Resolved complaints can be deleted by admin only."});
        }
        await complaints.deleteOne({ _id: id, reg_no: reg_no });
        res.status(200).json({ message: "Complaint deleted successfully." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};