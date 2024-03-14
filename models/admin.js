import mongoose, { Mongoose } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const adminSchema = new mongoose.Schema(
  {
  
    username: {
      type: String,
      required: true,
    },
    password: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

adminSchema.plugin(mongooseUniqueValidator);
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
