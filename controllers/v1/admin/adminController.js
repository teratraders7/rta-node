import { validationResult } from "express-validator";
import HttpError from "../../../utils/httpError.js";
import Admin from "../../../models/admin.js";
import jwt from 'jsonwebtoken'
import File from "../../../models/file.js";
import getFilePath from "../../../middlewares/multer/getFilePath.js";


// test register
export const register = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (! errors.isEmpty()) {
        return next(new HttpError("Invalid data inputs passed, Please check your data before retry!",422));
      } else {
         const { username, password } = req.body

         const user = await new Admin({
            username,
            password
         }).save()
         if (! user) {
          return next(new HttpError("Invalid credentials", 400))
         } else {
        //   const isValidPassword = await bcrypt.compare(password, user.password);
        //   if (! isValidPassword) {
        //    return next(new HttpError("Invalid credentials", 400))
        //   } else {
              
              res.status(200).json({
                status : true,
                message : 'admin added!',
                access_token : null,
                data : null
              })
            // }
         }
      }
    } catch (error) {
        console.log(error)
      return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
  };


export const login = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (! errors.isEmpty()) {
        return next(new HttpError("Invalid data inputs passed, Please check your data before retry!",422));
      } else {
         const { username, password } = req.body

         const user = await Admin.findOne({ username, password })
         if (! user) {
          return next(new HttpError("Invalid credentials", 400))
         } else {
        //   const isValidPassword = await bcrypt.compare(password, user.password);
        //   if (! isValidPassword) {
        //    return next(new HttpError("Invalid credentials", 400))
        //   } else {
              const token = jwt.sign({ user_id : user._id, username: user.username }, process.env.JWT_SECRET,
                  { expiresIn: process.env.JWT_TOKEN_EXPIRY }
                );
              res.status(200).json({
                status : true,
                message : '',
                access_token : token,
                data : null
              })
            // }
         }
      }
    } catch (error) {
        console.log(error)
      return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
  };

export const addFile = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (! errors.isEmpty()) {
        return next(new HttpError("Invalid data inputs passed, Please check your data before retry!",422));
      } else {
        const { name, link, index } = req.body
        const file = req.file ? getFilePath(req.file.path) : null
        if (! file) {
            return next(new HttpError('Cannot find the file path!', 400))
        } else {
            const newFile = await new File({
                name,
                file,
                link,
                index
            }).save()
    
             if (! newFile) {
              return next(new HttpError("Invalid credentials", 400))
             } else {
       
                  res.status(200).json({
                    status : true,
                    message : '',
                    access_token : null,
                    data : null
                  })
                // }
             }
        }
        
      }
    } catch (error) {
        console.log(error)
      return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
  };
