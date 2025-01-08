import express from "express"; 
import { userAuth } from "./authMiddlewares/user";
import prisma from "../db";

export const userRouter = express.Router();

userRouter.post("/metadata",userAuth, async (req: any, res: any)=> {
    // route to update avatar
 try {
    const userId = req.userId; 

    const response = await prisma.user.update({
        where : {
            id : userId
        }, 
        data : {
            avatarID : req.body.avatarID
        }
    })

    if(response){
        res.json({
            msg: "info updated",
            response
        })
    }
 } catch (error) {
    res.status(402).json({
        msg : "some error occured"
    });
    return;
 }
})

userRouter.get("/metadata/bulk",userAuth, async (req: any, res: any) => {
    // route to get all the users meta data, well basically search feature
    // for now adding feature to search one user at a time
    try {
        const username = req.body.username;
        
        const response = await prisma.user.findUnique({
            where : {
                username 
            }
        })

        if (response) {
            // const avatarID = response?.avatarID
        
            // const avatar = await prisma.avatars.findUnique({
            //     where : {
            //         id : avatarID
            //     }
            // })
            res.status(200).json({
                msg : "user found", 
                response
            })
        }
    } catch (error) {
        
    }
})