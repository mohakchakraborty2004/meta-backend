import WebSocket from "ws";
import prisma from "../db";
import { RedisManager } from "./redisManager";

enum Action {
    join,
    move
}

interface join {
    action: Action,
    spaceId : string,
    token : string
}

interface move {
    action : Action,
    spaceId : string, 
    x: Number, 
    y: Number
}

async function FindspaceID( spaceId : string) {

    const response = await prisma.space.findUnique({
    where : {
        id : spaceId
    }
    })
    if(response){
        return true;
    } else {
        return false;
    } 

}

// create a spaceId Map that fetches the space ids and stores it in the map against set of sockets.
type spaceMap = Map<String, Set<WebSocket>>;

export class spaceManager {

        private spaces: spaceMap;
        private pubsub: RedisManager;

        constructor() {
            this.spaces = new Map();
            this.pubsub = new RedisManager();
        }

        public async join (spaceId : string, ws: WebSocket){
            //check if the spaceId given by user is in the db or not. (done)
            const response = await FindspaceID(spaceId);

            if(response) {

                if(!this.spaces.has(spaceId)){
                    this.spaces.set(spaceId, new Set());
                    this.spaces.get(spaceId)?.add(ws);
                    console.log("space added to map");
                    //subscribtion addition here
                    this.pubsub.subscribe(spaceId, (message) => {
                    
                    this.Move(message)
                    })
                    ws.send(JSON.stringify("Space Joined"));
                } else {
                    this.spaces.get(spaceId)?.add(ws);
                    ws.send(JSON.stringify("Space joined"));
                }
            } else {
                ws.send(JSON.stringify("No Space found for that ID"))
            }

        }

        public handleMessage(message: any, ws: WebSocket){
            //check for the jwt authorization 
            const parsedMessage = JSON.parse(message);

            if(parsedMessage.action == "join") {
            this.join(parsedMessage.spaceId, ws);
            }else if(parsedMessage.action == "move") {
                console.log(parsedMessage);
                this.pubsub.publish(parsedMessage.spaceId, message);
            }else {
                console.log("wrong action");
                ws.send("wrong action");
            }

        }

        public Move(message : any){
            
            console.log("inside Move");
            const parsedMessage: move = JSON.parse(message.toString());

            console.log(parsedMessage);

            const spaceId = parsedMessage.spaceId;

            if(this.spaces.has(spaceId)){

                console.log(parsedMessage);

                this.spaces.get(spaceId)?.forEach((member) => {
                    console.log("sent");
                    member.send(JSON.stringify(parsedMessage));
                });

            }
            //make move checks. (todo)
        
            
            
            // (publish) send to all the other websocket joined the move and update on frontend accordingly.
            //make server send a message that movement is made.
        }
}