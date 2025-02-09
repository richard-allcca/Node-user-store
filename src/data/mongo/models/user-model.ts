import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({

  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  emailValidated: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  image: {
    type: String
  }
});

// NOTE - Se puede usar una función normal para no perder el scope de this
// Aquí filtramos los campos que no queremos mostrar en la respuesta
userSchema.methods.toJSON = function() {
  const { __v, _id, password, ...user } = this.toObject();
  user.uid = _id;
  return user;
}

export const UserModel = mongoose.model('User', userSchema);