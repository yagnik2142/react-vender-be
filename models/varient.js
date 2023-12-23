import mongoose from "mongoose";

const schema = new mongoose.Schema({
 
    varient: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Varient = mongoose.model("Varient", schema);
