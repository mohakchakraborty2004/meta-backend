import express from "express"; 
import cors from "cors";
import prisma from "./db";
import  router from "./Routes/AuthRoutes"

const app = express();

app.use(cors()); 
app.use(express.json()); 


app.use("/api/v1/", router);

// app.use("/api/v1/",router);




app.listen(3000);