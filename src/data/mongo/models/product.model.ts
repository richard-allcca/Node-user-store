import mongoose, { Schema } from "mongoose";




const productSchema = new  mongoose.Schema({

  name: {
    type: String,
    required: [ true, "Name is required" ],
  },
  available: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [ true, "User is required" ],
  },
  category: {
    // type: mongoose.Schema.Types.ObjectId,
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [ true, "Category is required" ],
  }

})