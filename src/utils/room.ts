import { Player } from "./player";
export class Room
{
    roomid : string;
    //totalRounds : number;
    //currentRound : number; Do we need them? Cause if there is drawer queue, then how we make sure of rounds?
    // We can either have one round robin round or have incentivized drawer points. (Will explain)
    currentWord : string | null;
    currentDrawer : string | null;
    players : Map<string, Player>; //string is jwt token and Player is the player object
    drawer : string[]; //Array of tokens
    inGame : boolean;
    //answeredAlready (we need this but how to implement it best. We will need in order of answering.)
    constructor(roomid : string)
    {
        this.roomid = roomid;
        this.currentWord = null;
        this.currentDrawer = null;
        this.players = new Map<string, Player>();
        this.drawer = [];
        this.inGame = false;
    }
    public addPlayer(player : Player) : void
    {
        this.players.set(player.getUsername(), player);
    }
    public removePlayer(username : string) : void
    {
        this.players.delete(username);
    }
    public endRound() : void // Right now void but it should give the points of the players in this round.
    {
        this.currentWord = null;
        this.currentDrawer = null;
        //return the points of the players after calculating.
    }
    public startRound() : string | null
    {
        if(this.drawer.length === 0)
        {
            return null;
        }
        else
        {
            const nextDrawer = this.drawer.shift()!;
            this.currentDrawer = nextDrawer;
            return nextDrawer;
        }
    } 
}