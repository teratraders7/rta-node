import mongoose, { Mongoose } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const fileSchema = new mongoose.Schema(
  {
  
    name: {
      type: String,
      required: true,
    },
    file: {
        type: String,
        required: true,
      },
    
    link: {
        type: String,
        required: true,
      },
    index: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

fileSchema.plugin(mongooseUniqueValidator);
const File = mongoose.model("File", fileSchema);

export default File;
