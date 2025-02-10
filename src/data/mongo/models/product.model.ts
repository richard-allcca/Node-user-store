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

productSchema.set("toJSON", {

  // DESC - Example 1 of how to remove fields from the response

  virtuals: true, // Agrega los campos virtuales en este caso el id
  versionKey: false, // Elimina el campo __v
  transform: function(doc, ret, options) {
    delete ret._id; // Elimina el campo _id
  }

  // DESC - Example 2 of how to remove fields from the response

  // transform: (document, returnedObject) => {
  //   returnedObject.id = returnedObject._id;
  //   delete returnedObject._id;
  //   delete returnedObject.__v;
  // }
});

export const ProductModel = mongoose.model("Product", productSchema);