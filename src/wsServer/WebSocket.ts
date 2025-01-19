//websocket init
// may be later on will change the name
import { WebSocketServer } from "ws";
import { spaceManager } from "./spaceManager";

const port = 8080;
const wss =  new WebSocketServer({port : port});

const SpaceManager = new spaceManager();

wss.on("connection", (socket)=> {
   

    socket.on("message", (rawMessage) => {

        try {
            
         const parsedMessage = JSON.parse(rawMessage.toString());
            
         if(!parsedMessage.action){
            socket.send(JSON.stringify({ message: "no action detected" }))
         } else if(parsedMessage.action){
            SpaceManager.handleMessage(rawMessage.toString(), socket);
         } else {
            socket.send(JSON.stringify("Some Error Occured"));
         }

        } catch (error) {
            console.log(error);
            console.log("try again fella");
        }
    })
})