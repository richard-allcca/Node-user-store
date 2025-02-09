import mongoose, { Schema } from "mongoose";



const categorySchema = new mongoose.Schema({

  name: {
    type: String,
    required: [ true, "Name is required" ],
    unique: true,
  },
  available: {
    type: Boolean,
    default: false,
  },
  user: {
    // type: mongoose.Schema.Types.ObjectId,
    type: Schema.Types.ObjectId,
    ref: "User",
  }

});

// NOTE - Se puede usar una función normal para no perder el scope de this
// Aquí filtramos los campos que no queremos mostrar en la respuesta
categorySchema.methods.toJSON = function() {
  const { __v, _id, ...category } = this.toObject();
  category.id = _id;
  return category;
}

export const CategoryModel = mongoose.model("Category", categorySchema);