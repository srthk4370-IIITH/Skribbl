import {createServer} from "http";
import {authRouter} from "./src/routes/authRoute";
import {lobbyRouter} from "./src/routes/lobbyRouter";
import {roomWebsocket} from "./src/routes/room";
import express from "express";
import { authMiddleware } from "./src/auth/authMiddleware";
import { WebSocketServer } from "ws";


const app = express();
 app.use(express.json());
 app.use("/", authRouter);
 app.use(authMiddleware);

 app.use("/", lobbyRouter);

const server = createServer(app);

const wss = new WebSocketServer({ server });

roomWebsocket(wss);

server.listen(3000);