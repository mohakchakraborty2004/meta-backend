//auth middleware for admins
import dotenv from "dotenv";

dotenv.config();

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET as String
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables.');
}

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

const authHeader = req.headers.authorization;

 if(!authHeader || !authHeader.startsWith('Bearer ') ){
   return res.status(403).json({
    msg : "invalid user/admin please login"
   })
 }

 const token = authHeader.split(' ')[1];

 try {
    const decoded = jwt.verify(token, "secret") as {id : string, role: "Admin" | "User"} 
    // need to change it JWT_SECRET, but some error persists.
  if(decoded.role !== "Admin"){
   return res.status(403).json({
        msg: "invalid access"
    })
  } else if(decoded.id && decoded.role) {
    // the req doesnt have any methods known as userId or role, so we gotta declare it globally.
   req.userId = decoded.id;
   req.role = decoded.role;
   next();
  }

 } catch (error) {
    console.log("error while checking");
    console.log(error);
    return res.status(500).json({
      msg : "some error occured"
    })
 }
}