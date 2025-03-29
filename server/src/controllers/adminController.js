import admins from "../models/admins.js";
import users from "../models/users.js";
import complaints from "../models/complaints.js";
import priorities from "../models/priorities.js";
import hashPassword from "../middlewares/hashPassword.js";
import verifyPassword from "../middlewares/verifyPassword.js";
import categorizeComplaint from "../middlewares/categorizeComplaint.js";
import jwt from "jsonwebtoken";
// import mongoose from "mongoose";
import { sendResolutionEmail } from '../utils/emailService.js';
// import validateToken from "../middlewares/validateToken.js";

// @method GET
// @route /api/admin/details
// @access PRIVATE (admin)
export const getUser = async (req,res) => {
    try {
        if (!req.decoded || req.decoded.data.role!="admin") {
            res.status(403).json({message: "Access denied, admin only."});
            return;
        }
        const {reg_no} = req.query;
        const user = await users.findOne({reg_no: reg_no}).select({"_id":0, "hashedPassword":0, "__v":0});
        if (!user) {
            res.status(404).json({message: "User not found."});
            return;
        }
        res.status(200).json(user);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error."});
        throw error;
    }
};

// @method POST
// @route /api/admin/register
// @access PUBLIC (admin)
// @request body {name, email_id, phone_no, block, password}
export const registerAdmin = async (req,res) => {
    try {
        // if (!req.decoded || req.decoded.data.role!="admin") {
        //     res.status(403).json({message: "Access denied, admin only."});
        //     return;
        // }
        // const adminBlock = req.decoded.data.block;
        // if (adminBlock!="MH-*" || adminBlock!="LH-*") {
        //     return res.status(400).json({message: "Only main office can register block admins or main office admins."});
        // }
        let {name, email_id, phone_no, block, password} = req.body;
        const admin = await admins.findOne({email_id: email_id, block: block});
        if (admin) {
            res.status(400).json({message: "Admin already exists."});
            return;
        }
        const hashedPassword = await hashPassword(password);
        await admins.create({name, email_id, phone_no, block, hashedPassword});
        res.status(201).json({message: "Admin registered successfully."});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error."});
        throw error;
    }
};

// @method POST
// @route /api/admin/login
// @access PRIVATE (admin)
// @request body {email_id, password}
export const loginAdmin = async (req,res) => {
    try {
        const {email_id, password} = req.body;
        if (!email_id || !password) {
            res.status(400).json({message: "All fields are mandatory"});
            return;
        }
        const admin = await admins.findOne({email_id: email_id});
        if (!admin) {
            res.status(400).json({message: "Invalid credentials."});
            return;
        }
        const verified = await verifyPassword(password, admin.hashedPassword);
        if (!verified) {
            res.status(400).json({message: "Invalid credentials."});
            return;
        }
        const accessToken = jwt.sign({
            data: {
                email_id: admin.email_id,
                id: admin._id,
                block: admin.block,
                role: "admin"
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
// @route /api/admin/logout
// @access PRIVATE (admin)
export const logoutAdmin = (req,res) => {
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
// @route /api/admin/current
// @access PRIVATE (admin)
export const currentAdmin = async (req,res) => {
    try {
        if (!req.decoded || req.decoded.data.role!="admin") {
            res.status(403).json({message: "Access denied, admin only."});
            return;
        }
        const email_id = req.decoded.data.email_id;
        const admin = await admins.findOne({email_id: email_id}).select({"_id":0, "hashedPassword":0, "__v":0})
        res.status(200).json({
            message: "Current Admin details.",
            admin: admin
        });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
};

// @method DELETE
// @route /api/admin/delete/admin/:id
// @access PRIVATE (admin)
export const deleteAdmin = async (req,res) => {
    try {
        if (!req.decoded || req.decoded.data.role!="admin") {
            res.status(403).json({message: "Access denied, admin only."});
            return;
        }
        const mainAdminBlock = req.decoded.data.block;
        const mainAdminId = req.decoded.data.id;
        if (mainAdminBlock!="MH-*" || mainAdminBlock!="LH-*") {
            return res.status(400).json({message: "Only main office can delete block admins or main office admins."});
        }
        const { id } = req.params;
        if (id==mainAdminId) {
            return res.status(400).json({message: "Admin cannot delete his/her own account."});
        }
        await admins.deleteOne({_id: id});
        res.status(200).json({message: "Admin deleted successfully."});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
};


// @method DELETE
// @route /api/users/delete/user/:reg_no
// @access PRIVATE (admin)
export const deleteUser = async (req,res) => {
    try {
        if (!req.decoded || req.decoded.data.role!="admin") {
            res.status(403).json({message: "Access denied, admin only."});
            return;
        }
        const reg_no = req.params.reg_no;
        const user = await users.findOne({reg_no: reg_no});
        if (!user) {
            res.status(400).json({message: "Invalid registration number."});
            return;
        }
        await users.deleteOne(user);
        res.status(200).json({message: "User deleted successfully."});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error."});
    }
};

// @method GET
// @route /api/admin/complaints/details
// @access PRIVATE (admin)
export const getAllComplaints = async (req, res) => {
    try {
        if (!req.decoded || req.decoded.data.role!="admin") {
            res.status(403).json({message: "Access denied, admin only."});
            return;
        }
        let allComplaints;
        const block = req.decoded.data.block;
        if (!/^MH-|^LH-/.test(block)) { 
            return res.status(400).json({ message: "Invalid block name." });
        } 
        if (block=="MH-*") {
            allComplaints = await complaints.find({block: {$regex: /^MH-/}}).select("-__v");
        }
        else if (block=="LH-*") {
            allComplaints = await complaints.find({block: {$regex: /^LH-/}}).select("-__v");
        }
        else {
            allComplaints = await complaints.find({block: block}).select("-__v");
        }
        res.status(200).json({
            message: "All complaints retrieved successfully.",
            complaints: allComplaints,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// @method PUT
// @route /api/admin/complaints/update/:reg_no/:id
// @access PRIVATE (admin)
// @request body {fields to be updated}
export const updateComplaintStatus = async (req,res) => {
    try {
        if (!req.decoded || req.decoded.data.role!="admin") {
            res.status(403).json({message: "Access denied, admin only."});
            return;
        }
        const reg_no = req.query.reg_no;
        const complaint_id = req.query.id;
        const block = req.decoded.data.block;
        let complaint;
        if (block=="MH-*" || block=="LH-*") {
            complaint = await complaints.findOne({reg_no: reg_no, _id: complaint_id});
        }
        else {
            complaint = await complaints.findOne({reg_no: reg_no, _id: complaint_id, block: block});
        }
        if (!complaint) {
            res.status(404).json({message: "Complaint not found."});
            return;
        }
        const newStatus = (complaint.status=="pending") ? "solved" : "pending";
        const updatedComplaint = await complaints.findOneAndUpdate(
            {reg_no: reg_no, _id: complaint_id}, 
            {status: newStatus}, 
            {new: true}
        );

        // Send email notification if complaint is resolved
        if (newStatus === "solved") {
            try {
                const user = await users.findOne({ reg_no: reg_no });
                if (user && user.email_id) {
                    await sendResolutionEmail(user.email_id, {
                        category: complaint.category,
                        complaint: complaint.complaint,
                        block: complaint.block,
                        room_no: complaint.room_no
                    });
                }
            } catch (emailError) {
                console.error('Failed to send resolution email:', emailError);
                // Don't let email failure affect the complaint update
            }
        }

        res.status(200).json({
            message: "Complaint status updated successfully.", 
            complaint: updatedComplaint
        });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error."});
    }
};

// @method DELETE
// @route /api/admin/complaints/delete/:id
// @access PRIVATE (admin)
export const deleteComplaint = async (req, res) => {
    try {
        if (!req.decoded || req.decoded.data.role!="admin") {
            res.status(403).json({message: "Access denied, admin only."});
            return;
        }
        const { id } = req.params;
        const block = req.decoded.data.block;
        let complaint;
        
        if (block === "MH-*" || block === "LH-*") {
            complaint = await complaints.findOne({_id: id});
        } else {
            complaint = await complaints.findOne({_id: id, block: block});
        }

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found." });
        }

        if (complaint.status === "pending") {
            return res.status(400).json({message: "Admin can only delete resolved complaints."});
        }

        await complaints.deleteOne({ _id: id });
        res.status(200).json({ message: "Complaint deleted successfully." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// @method POST
// @route /api/admin/complaints/categorize
// @access PRIVATE (admin)
// @request query {id}
export const setComplaintPriority = async (req, res) => {
    try {
        if (!req.decoded || req.decoded.data.role!="admin") {
            res.status(403).json({message: "Access denied, admin only."});
            return;
        }
        const { id } = req.query;
        const block = req.decoded.data.block;
        let complaint;
        
        if (block === "MH-*" || block === "LH-*") {
            complaint = await complaints.findOne({_id: id});
        } else {
            complaint = await complaints.findOne({_id: id, block: block});
        }

        if (!complaint) {
            res.status(404).json({ message: "Complaint not found." });
            return;
        }

        if (complaint.status === "solved") {
            res.status(400).json({message: "Complaint already resolved."});
            return;
        }

        const {label, score} = await categorizeComplaint(complaint.complaint);
        
        // Create priority record
        const priority = await priorities.create({
            complaint_id: id, 
            priority: label, 
            score: score
        });
        
        // Update complaint with priority
        const updatedComplaint = await complaints.findOneAndUpdate(
            { _id: id },
            { priority: label },
            { new: true }
        );
        
        res.status(200).json({ 
            success: true,
            message: "Complaint assigned priority successfully.", 
            priority: priority,
            complaint: updatedComplaint
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};