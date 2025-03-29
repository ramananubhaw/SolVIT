import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    reg_no: {
        type: String,
        required: true
    },
    block: {
        type: String,
        required: true
    },
    room_no: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ["electrical", "civil", "plumbing", "cleaning", "medical", "sanitation", "food", "laundry", "security", "ragging/bullying", "staff behaviour", "internet connectivity", "other"],
        required: true
    },
    complaint: {
        type: String,
        maxlength: 500,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "solved"],
        default: "pending",
        required: true
    },
    priority: {
        type: String,
        enum: ["Normal", "Problematic", "Critical"],
        default: null
    }
}, {timestamps: true});

const complaints = mongoose.model("complaints", complaintSchema);

export default complaints;