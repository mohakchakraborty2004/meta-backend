import express from "express"; 

export const spaceRouter = express.Router();

spaceRouter.post("/create", async (req: any, res: any)=> {
//creating a space
// there should be a option which fetches all the pre existing spaces and chosing one of the creates the space.
})

spaceRouter.delete("/:spaceId", async(req: any, res: any)=> {
//deleting a space created
})

spaceRouter.get("/all", async(req: any, res: any)=> {
// get all the existing spaces that i created
})

spaceRouter.get("/:spaceId", async(req: any, res: any)=> {
// get the selected space info i.e all the elements existing
})

spaceRouter.post("/element",async(req: any, res: any)=> {
    //add an element into the space 
})

spaceRouter.delete("/element", async(req: any, res: any)=> {
    //delete the element added to the space, not from the section where all the element exists.
})

