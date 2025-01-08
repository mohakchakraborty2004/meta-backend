//auth middleware for user
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const userAuth = async(req: Request, res: Response , next: NextFunction): Promise<any> => {

const authHeader = req.headers.authorization;

 if(!authHeader || !authHeader.startsWith('Bearer ') ){
  return res.status(403).json({
    msg : "invalid user please login"
   })
  
 }

 const token = authHeader.split(' ')[1];

 try {
    const decoded = jwt.verify(token, "secret") as {id : string, role: "User"| "Admin"}
    
    if(decoded.id){
      // global has been declared in the admin.ts file, will shift it to better place later.
      req.userId = decoded.id;
      req.role = decoded.role;
      next();
    } else {
        res.status(401).json({
            msg : "unaurthorized access"
        });
    }

 } catch (error) {
    console.log("error while checking");
    console.log(error);
 }
}