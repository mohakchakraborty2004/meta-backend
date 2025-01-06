//auth middleware for user
import express from "express";
import jwt from "jsonwebtoken";

export const userAuth = (req: any, res: any, next: any) => {

const authHeader = req.headers.authorization;

 if(!authHeader || !authHeader.startsWith('Bearer ') ){
   return res.status(403).json({
    msg : "invalid user please login"
   })
 }

 const token = authHeader.split(' ')[1];

 try {
    const decoded = jwt.verify(token, "secret") as {id : string, role: string}
    
    if(decoded.id){
      req.userId = decoded.id;
      req.role = decoded.role;
      next();
    } else {
        res.status(401).json({
            msg : "unaurthorized access"
        });
        return;
    }

 } catch (error) {
    console.log("error while checking");
    console.log(error);
 }
}