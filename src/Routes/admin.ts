import express, { Request, Response } from "express";
import { adminMiddleware } from "./authMiddlewares/admin";
import prisma from "../db";

export const adminRouter =  express.Router();


adminRouter.post("/createElement", adminMiddleware, async(req: any, res: any)=> {
    //create an element to be added in the element section, can only be done by the creator.
    try {
        const userId = req.userId;

        const response = await prisma.elements.create({
            data : {
                width : req.body.width,
                height : req.body.height,
                ImageUrl : req.body.ImageUrl
            }
        })

        if(response){
            return res.status(200).json({
                msg : "element created",
                id : response.id
            })
        }
    } catch (error) {
        console.log(error);
        res.status(502).json({
            msg : "internal server error"
        })
    }
})

adminRouter.put("/element/:elementid",adminMiddleware, async (req:any, res:any) => {
    // update the existing element, cannot change dimensions. only image url.
    try {
        const userId = req.userId;
        const elementId = req.params.elementid;

        const response =  await prisma.elements.update({
            where : {
                id : elementId
            },
            data : {
                ImageUrl : req.body.ImageUrl
            }
        })

        if(response) {
            res.status(200).json({
                msg : "element updated"
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg  : "internal server error"
        })
    }
})

adminRouter.post("/createAvatar",adminMiddleware, async(req: any, res: any)=> {
    //create an avatar to be added in the avatar section, can only be done by the creator.
    try {
        const userId = req.userId;

        const response = await prisma.avatars.create({
            data : {
             imageUrl : req.body.imageUrl,
             name : req.body.name,     
            }
        })

        if(response){
            return res.status(200).json({
                msg : "Avatar created",
                id : response.id
            })
        }
    } catch (error) {
        console.log(error);
        res.status(502).json({
            msg : "internal server error"
        })
    }
})

adminRouter.post("/createMap", adminMiddleware, async(req: any, res:any) => {
    //create a map to select from the set of maps.
    try {
        const userId = req.userId;
    // this needs to be checked
    // add a thumbnail as well
        const response = await prisma.map.create({
            data : {
                name : req.body.name,
                width : req.body.width,
                height : req.body.height,
                MapElements : {
                   createMany : {
                     data : {
                        elementID : req.body.elementID,
                        x : req.body.x,
                        y : req.body.y
                     }
                   }
                }
            }
        })

        if(response){
            return res.status(200).json({
                msg : "map created", 
                mapId : response.id
            })
        }
    } catch (error) {
        
    }
})