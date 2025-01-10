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

spaceRouter.delete("/delete/:spaceId",userAuth, async(req: any, res: any)=> {
//deleting a space created
try {
    const spaceId = req.params.spaceId;

const space = await prisma.space.findUnique({
where : {
    id : spaceId
},
select : {
    creatorID : true
}
})

if(space?.creatorID != req.userId){
    return res.status(402).json({
        msg : "user unauthorized"
    })
}

const response = await prisma.space.delete({
    where : {
        id : spaceId
    }
})

res.status(200).json({
    msg: "space deleted"
})
} catch (error) {
    console.log(error);
    res.staus(500).json({
        msg : "internal server error"
    })
}

})

spaceRouter.get("/all", userAuth, async(req: any, res: any)=> {
// get all the existing spaces that the user created
try {
    const userId = req.userId;

    const response = await prisma.space.findMany({
        where : {
            creatorID : userId
        }
    })

    if(!response){
        return res.status(400).json({
            msg :  "spaces not found"
        })
    }

    res.status(200).json({
        msg : "spaces fetched", 
        spaces : response.map(s => ({
            spaceId : s.id,
            name : s.name,
            thumbnail : s.thumbnail,
            dimensions : `${s.height} x ${s.width}`
        }))
    })

    // this is another way :

//     const response1 = await prisma.user.findUnique({
//         where : {
//             id : userId
//         },
//         select : {
//             spaces : true
//         }
//     })

//     res.status(200).json({
//         msg : "spaces fetched", 
//         spaces : response1?.spaces.map(s => ({
//             spaceId : s.id,
//             thumbnail : s.thumbnail,
//             name : s.name
//         }))
//     })


} catch (error) {
    console.log(error);
    res.status(500).json({
        msg : "internal server error"
    })
}
})

spaceRouter.get("/:spaceId",userAuth, async(req: any, res: any)=> {
// get the selected space info i.e all the elements existing
try {
    const userId = req.userId;
    const spaceId =  req.params.spaceId

    const space = await prisma.space.findUnique({
        where : {
            id : spaceId
        }
    })

    if(space?.creatorID != userId || !space){
        return res.json({
            msg : "either user unauthorized or the space doesnt exists"
        })
    }

    const spaceElements = await prisma.spaceElements.findMany({
        where : {
            spaceID : spaceId
        }
    })
     
    if(spaceElements){
      return  res.status(200).json({
            msg : "elements fetched", 
            elements : spaceElements.map(s => ({
                id : s.id,
                elementId : s.elementID,
                x : s.height,
                y : s.width
            }))
        })
    }

    
} catch (error) {
    console.log(error); 
    res.status(500).json({
        msg : "internal server error"
    })
}
})

spaceRouter.post("/element",userAuth, async(req: any, res: any)=> {
    //add an element into the space 
    try {
        
    } catch (error) {
        
    }
})

spaceRouter.delete("/RemoveElement",userAuth, async(req: any, res: any)=> {
    //delete the element added to the space, not from the section where all the element exists.
})

