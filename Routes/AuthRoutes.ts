import  express  from "express";
import prisma from "../db";

const router = express.Router();


router.post("/signup", async(req: any , res: any)=> {
    try {
        const {email ,password, role} = req.body; 

        const exstEmail = await prisma.user.findUnique({
            where : {
                email
            }
        });
    
        if(exstEmail){
         return res.json({
            msg : "email already exists"
         })
        };
    
        const response = await prisma.user.create({
            data : {
                email,
                password,
                role
            }
        })
    
        const id = response.id;
    
        {
            //jwt logic here
        }

        return res.json({
            msg : "user created successfully"
        })
    } catch (error) {
        
    }

   
})

router.post("/login", async(req: any, res: any) => {
//login logic
})

export default router