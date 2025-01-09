import express from "express"; 
import { userAuth } from "./authMiddlewares/user";
import prisma from "../db";

export const spaceRouter = express.Router();

spaceRouter.post("/create",userAuth, async (req: any, res: any)=> {
//creating a space
// there should be a option which fetches all the pre existing spaces and chosing one of the creates the space.
try {
 //selects a map from the given set of created maps.
 const mapId = req.body.mapId;
 if(!mapId){
    const response = await prisma.space.create({
        data : {
           name : req.body.name,
           width : req.body.width,
           height : req.body.height,
           thumbnail : req.body.thumbnail,//a link of img 
           creatorID : req.userId
        }
    })

    return res.status(200).json({
        msg : "empty space created",
        space : response.id
    })
 }

const map = await prisma.map.findUnique({
    where : {
        id : mapId
    },
    select : {
        MapElements: true,
        width : true,
        height: true,
        // name : true
    }
})

if(!map){
    return res.status(404).json({
        msg : "map not found sir"
    })
}

// now if the map is there, we copy the map elements , width, height and name and create a space with it.
// to handle multiple load on database , we lock it, i.e transactions

let space = await prisma.$transaction(async()=> {
    const space = await prisma.space.create({
        data : {
            name : req.body.name,
            width : map.width,
            height : map.height,
            creatorID : req.userId,
            thumbnail : req.body.thumbnail // change the schema for the map 
        }
    }); 

   // create the space elements as well

    await prisma.spaceElements.createMany({
        data :  map.MapElements.map(m => ({
          spaceID : m.id,
          elementID : m.elementID,
          width : m.y,
          height : m.x
        }))
    })

    return space
})

res.status(200).json({
    msg: "space created successfully",
    space : space.id
})

} catch (error) {
    
}
})

spaceRouter.delete("/:spaceId",userAuth, async(req: any, res: any)=> {
//deleting a space created
})

spaceRouter.get("/all", userAuth, async(req: any, res: any)=> {
// get all the existing spaces that the user created
})

spaceRouter.get("/:spaceId",userAuth, async(req: any, res: any)=> {
// get the selected space info i.e all the elements existing
})

spaceRouter.post("/element",userAuth, async(req: any, res: any)=> {
    //add an element into the space 
})

spaceRouter.delete("/RemoveElement",userAuth, async(req: any, res: any)=> {
    //delete the element added to the space, not from the section where all the element exists.
})

