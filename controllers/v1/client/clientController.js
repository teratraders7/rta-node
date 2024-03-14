import { validationResult } from "express-validator";
import HttpError from "../../../utils/httpError.js";
import File from "../../../models/file.js";

export const getPdfPath = async (req, res, next) => {
  console.log(req,'req')
    try {
      const errors = validationResult(req);
      if (! errors.isEmpty()) {
        return next(new HttpError("Invalid data inputs passed, Please check your data before retry!",422));
      } else {
         const { index } = req.body

         const file = await File.findOne({ index })
         if (! file) {
          return next(new HttpError("No file found!", 400))
         } else {
            
              res.status(200).json({
                status : true,
                message : '',
                access_token : null,
                data : file.file
              })
            // }
         }
      }
    } catch (error) {
        console.log(error)
      return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
  };