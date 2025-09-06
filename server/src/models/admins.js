import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        unique: true,
        required: true
    },
    phone_no: {
        type: Number,
        length: 10,
        required: true
    },
    block: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        unique: true,
        minlength: 8,
        required: true
    }
});

const admins = mongoose.model("admins", adminSchema);

export default admins;