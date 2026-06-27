import express from "express";
import { authMiddleware } from "../auth/authMiddleware";
import { authRouter } from "./authRoute";

const app = express();
app.use(express.json());
app.use("/", authRouter);
app.use(authMiddleware);

app.get("/join/:roomid", (req, res) => {
    // Handle joining a room using websocket
    return res.status(200).json({message: "Joined room successfully."});
})

app.listen(3000);

//Change this to only have join route and create route.... listening will be shifted to index.ts file in root.
//Signin and join working...