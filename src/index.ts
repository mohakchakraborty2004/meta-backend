import express from "express"; 
import cors from "cors";
import  router from "./Routes/AuthRoutes"

const app = express();

app.use(cors()); 
app.use(express.json()); 


app.use("/api/v1/", router);

// base Routing file




app.listen(3002);