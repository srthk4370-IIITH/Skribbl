import type {Request, Response} from "express";
import {RoomController} from "../utils/roomController";


// import express from "express";
// import { authMiddleware } from "../auth/authMiddleware";
// import { authRouter } from "./authRoute";

// const app = express();
// app.use(express.json());
// app.use("/", authRouter);
// app.use(authMiddleware);

// app.get("/join/:roomid", (req, res) => {
//     // Handle joining a room using websocket
//     return res.status(200).json({message: "Joined room successfully.", admin: req.body.isAdmin});
// })



//Change this to only have join route and create route.... listening will be shifted to index.ts file in root.
//Signin and join working...

export const createRoom = (req: Request, res: Response) : any => {
    if(!req.body.isAdmin)
    {
        return res.status(403).json({error: "You are not authorized to create a room."});
    }
    const roomId = Math.random().toString(36).substring(2);
    if(RoomController.rooms.has(roomId))
    {
        return createRoom(req, res);
    }
    const success = RoomController.createRoom(roomId);
    if(success)
    {
        return res.status(200).json({roomId: roomId});
    }
    else
    {
        return res.status(500).json({error: "Error creating room."});
    }
}


// app.get("/create", createRoom);


// app.listen(3000);