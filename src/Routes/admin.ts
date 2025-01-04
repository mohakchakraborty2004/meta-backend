import express from "express";

export const adminRouter =  express.Router();

adminRouter.post("/createElement", async(req: any, res: any)=> {
    //create an element to be added in the element section, can only be done by the creator.
})

adminRouter.put("/element/:elementid", async (req:any, res:any) => {
    // update the existing element, cannot change dimensions. only image url.
})

adminRouter.post("/createAvatar", async(req: any, res: any)=> {
    //create an avatar to be added in the avatar section, can only be done by the creator.
})

adminRouter.post("/createMap", async(req: any, res:any) => {
    //create a map to select from the set of maps.
})