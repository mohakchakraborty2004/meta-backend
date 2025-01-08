//overriding the Request method
import { Express } from "express"

declare global {
  namespace Express {
    export interface Request {
      role? : "Admin" | "User" ,
      userId? : string
    }
  }
}