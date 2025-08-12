import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reg_no: {
        type: String,
        required: true,
        unique: true
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
    room_no: {
        type: Number,
        required: true
    },
    hashedPassword: {
        type: String,
        unique: true,
        minlength: 8,
        required: true
    }
});

const users = mongoose.model("users", userSchema);

export default users;