import express from "express"; 
import cors from "cors";

const app = express();

app.use(cors()); 
app.use(express.json()); 


app.post("/api/v1/signup", async (req : any, res: any) => {
   
})

app.post("/api/v1/signin", async (req : any, res: any) => {

})




app.listen(3000);