import Redis from "ioredis"


export class RedisManager {

    private sub: Redis;
    private pub: Redis;

    constructor() {
        this.pub = new Redis();
        this.sub = new Redis();
    }

    public async subscribe( spaceId : string, callback: (message: any) => void) {

        const channel = `space:${spaceId}`;
        await this.sub.subscribe(channel);

        this.sub.on("message", (subscribedChannel, message) => {
            if(subscribedChannel == channel){
                callback(message);
            }
        })

    }

    //this can be wrong probably.
    public async publish(spaceId : string, message: any) {
        console.log("publish block");
        const channel = `space:${spaceId}`;
        await this.pub.publish(channel,JSON.stringify(message))
        console.log("published");
    }
}