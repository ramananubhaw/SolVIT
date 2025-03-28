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
        maxlength: 100,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "solved"],
        default: "pending",
        required: true
    }
}, {timestamps: true});

const complaints = mongoose.model("complaints", complaintSchema);

export default complaints;