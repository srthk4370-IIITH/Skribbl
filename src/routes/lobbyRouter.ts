import {createRoom, joinRoom} from "../store/lobby";
import express from "express";

export const lobbyRouter = express.Router();

lobbyRouter.get("/create", createRoom);
lobbyRouter.get("/join/:roomid", joinRoom);