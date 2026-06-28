//This is have class RoomController which is used to manage the rooms in the application.
//It will have methods to create, delete, and manage rooms.
//It will also have methods to manage websocket communication.
//Map of rooms -> which has players -> which has websocket. These will be handled by this.

import { Room } from "./room";
import {Player} from "./player";
export class RoomController 
{
    public static rooms : Map<string, Room> = new Map<string, Room>();
    public static createRoom(roomId: string) : boolean
    {
        try
        {    
            RoomController.rooms.set(roomId, new Room(roomId));
            return true;
        }
        catch(e)
        {
            console.error(`Error creating room with id ${roomId}: ${e}`);
            return false;
        }
    }
    public static connectPlayer(roomId : string, player : Player) : boolean
    {
        try
        {
            const room = RoomController.rooms.get(roomId);
            room?.addPlayer(player);
            return true;
        }
        catch(e)
        {
            console.error(`Error connecting player to room with id ${roomId}: ${e}`);
            return false;
        }
    }
    public static disconnectPlayer(roomId : string, username : string) : boolean
    {
        try
        {
            const room = RoomController.rooms.get(roomId);
            room?.removePlayer(username);
            return true;
        }
        catch(e)
        {
            console.error(`Error disconnecting player from room with id ${roomId}: ${e}`);
            return false;
        }
    }
    public static broadcastMessage(roomId : string, message : string) : void
    {
        const room = RoomController.rooms.get(roomId);
        if(room)
        {
            try
            {
                room.players.forEach((player : Player) => {
                    player.websocket.send(JSON.stringify({type: "message", data: message}));
                })
            }
            catch(e)
            {
                console.error(`Error broadcasting message to room with id ${roomId}: ${e}`);
            }
        }
    }
    public static personalMessage(roomId : string, id : string, message : string)
    {
        const player = RoomController.rooms.get(roomId)?.players.get(id);
        if(player)
        {
            try
            {
                player.websocket.send(JSON.stringify({type: "message", data: message}));
            }
            catch(e)
            {
                console.error(`Error sending personal message to player with id ${id} in room with id ${roomId}: ${e}`);
            }
        }
    }
}