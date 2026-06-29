//This takes the Game Room logic implemented through websocket.
import {WebSocket, WebSocketServer} from "ws";
import {RoomController} from "../utils/roomController";
import {Player} from "../utils/player";

export function roomWebsocket(wss: WebSocketServer) : void
{
    wss.on("connection", (ws: WebSocket, req) => { // /ws/:userId/:roomId
        const uid = req.url?.split("/")[1];
        const roomid = req.url?.split("/")[2];
        if(!uid)
        {
            ws.close(1008, JSON.stringify({error: "No UserID"}));
        }
        if(!roomid)
        {
            ws.close(1008, JSON.stringify({error: "No RoomID"}));
        }
        if(RoomController.rooms.has(roomid as string))
        {
            const pl: Player = new Player(uid as string, ws as WebSocket, roomid as string);
            const success = RoomController.connectPlayer(roomid as string, pl);
            if(!success)
            {
                ws.close(1008, JSON.stringify({error: "Failed to connect player to room"}));
            }
            else
            {
                ws.send(JSON.stringify({type: "message", data: `Connected to room ${roomid}`}));
            }
            RoomController.broadcastMessage(roomid as string, `${uid} has joined the room.`);
        }
        else
        {
            ws.close(1008, JSON.stringify({error: "Room not found"}));
        }
    });
}
