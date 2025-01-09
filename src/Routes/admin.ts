import express, { Request, Response } from "express";
import { adminMiddleware } from "./authMiddlewares/admin";

export const adminRouter =  express.Router();


adminRouter.post("/createElement", adminMiddleware, async(req: any, res: any)=> {
    //create an element to be added in the element section, can only be done by the creator.

})

adminRouter.put("/element/:elementid",adminMiddleware, async (req:any, res:any) => {
    // update the existing element, cannot change dimensions. only image url.
})

adminRouter.post("/createAvatar",adminMiddleware, async(req: any, res: any)=> {
    //create an avatar to be added in the avatar section, can only be done by the creator.
})

adminRouter.post("/createMap", adminMiddleware, async(req: any, res:any) => {
    //create a map to select from the set of maps.
})