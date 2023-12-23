import mongoose from "mongoose";

const schema = new mongoose.Schema({
 
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  vendorList: [
    {
        vendorName:{
            type: String,
            required: true,
        }
        ,
        varient:{
            type: String,
            required: true,
        },

        number:{
            type: String,
            required: true,
        }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Vendor = mongoose.model("Vendor", schema);
