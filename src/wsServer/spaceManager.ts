import WebSocket from "ws";
import prisma from "../db";

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

class spaceManager {

    private spaces: spaceMap;

    constructor() {
        this.spaces = new Map();
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
                ws.send(JSON.stringify("Space Joined"));
            } else {
                this.spaces.get(spaceId)?.add(ws);
            }
        } else {
            ws.send(JSON.stringify("No Space found for that ID"))
        }

       
        //make him join the server (done)
        //subscibe on join 
        // make server send a message that space joined(done)


    }

    public handleMessage(){
        //check for the jwt authorization 

    }

    public Move(){
        //make a move 
        // (publish) send to all the other websocket joined the move and update on frontend accordingly.
        //make server send a message that movement is made.
    }
}