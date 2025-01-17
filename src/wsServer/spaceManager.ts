import WebSocket from "ws";

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

class spaceManager {

    public join(){

    }

    public handleMessage(){

    }

    public Move(){
        
    }
}