//auth middleware for admins
// to check if the loggedin one is admin or not. 

import jwt from "jsonwebtoken";

export const adminAuth = (req: any, res: any, next: any) => {

const authHeader = req.headers.authorization;

 if(!authHeader || !authHeader.startsWith('Bearer ') ){
   return res.status(403).json({
    msg : "invalid user please login"
   })
 }

 const token = authHeader.split(' ')[1];

 try {
    const decoded = jwt.verify(token, "secret") as {id : string, role: string}
    
  if(decoded.role !== "admin"){
    res.status(403).json({
        msg: "invalid access"
    })
    return;
  } else if(decoded.id) {
   req.userId = decoded.id;
   req.role = decoded.role;
   next();
  }


 } catch (error) {
    console.log("error while checking");
    console.log(error);
 }
}