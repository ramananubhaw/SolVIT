import mongoose from "mongoose";

const prioritySchema = new mongoose.Schema({
   complaint_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "complaints",
    required: true,
    unique: true
   },
   priority: {
    type: String,
    enum: ["Normal", "Problematic", "Critical"],
    required: true
   },
   score: {
    type: Number,
    required: true
   }
}, {timestamps: true});

const priorities = mongoose.model("priorities", prioritySchema);

export default priorities;