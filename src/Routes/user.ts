// this route is complete and needs to be tested

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
    console.log(error);
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
        const usernamesString = req.query.usernames;
        // "api/v1/user/metadata/bulk?usernames=`encoded array of usernames`"
        // frontend call should be like GET `/api/v1/metadata/bulk?ids=${encodeURIComponent(JSON.stringify(usernames))}`
        // where usernames is an array encoded in string format
        const usernames = JSON.parse(usernamesString);
        
        const response = await prisma.user.findMany({
            where : {
                username : {
                    in : usernames
                }
            },
            select : {
                avatar: true,
                id: true
            }
        })

        if (response) {
            res.status(200).json({
                msg : "user found", 
                avatars : response.map(r => ({
                    userID : r.id,
                    avatarID : r.avatar?.imageUrl
                }))
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(402).json({
            msg: "some error occured"
        })
    }
})