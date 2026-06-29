import { WebSocket } from "ws";
export class Player
{
    private username : string;
    private score : number;
    public isDrawer : boolean;
    public websocket : WebSocket;
    public roomid : string;
    constructor(username : string, websocket : WebSocket, roomid : string)
    {
        this.username = username;
        this.score = 0;
        this.isDrawer = false;
        this.websocket = websocket;
        this.roomid = roomid;
    }
    public increaseScore(points : number) : void
    {
        this.score += points;
    }
    public getScore() : number
    {
        return this.score;
    }
    public getUsername() : string
    {
        return this.username;
    }
}