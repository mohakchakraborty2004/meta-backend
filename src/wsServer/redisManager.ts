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
    public async publish(spaceId : string, x: number, y:number) {
        const channel = `space:${spaceId}`;
        const message: any = {
            x,
            y
        }
        await this.pub.publish(channel, message)
        console.log("published");
    }
}