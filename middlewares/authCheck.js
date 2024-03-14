import jwt from "jsonwebtoken";
import HttpError from "../utils/httpError.js";
import Admin from "../models/admin.js";
import mongoose from "mongoose";

const authCheck = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (! token) {
    //   throw new Error("Authentication Failed!", 403);
        return next(new HttpError("Authentication Failed", 403))
    }
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decodedToken, 'decoded token')
    const query = { _id: mongoose.Types.ObjectId(decodedToken.user_id)}
    console.log(query, 'query')

    const user = await Admin.findOne(query);

console.log(user, 'user from auth check')
    if (! user) {
      return next(new HttpError("Invalid credentials", 400))
    } else {
      req.userData = { userId : decodedToken.user_id , username : decodedToken.username }; 
      next();
    }
  } catch (err) {
    return next(new HttpError("Authentication failed", 403));
  }
};

export default authCheck;
