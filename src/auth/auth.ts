import type {Response, Request} from 'express';
import jwt from "jsonwebtoken";
import { usernameValidation } from "../utils/validation";
import { players } from "../utils/data"


export const auth = (req: Request, res: Response) => {
    const username = usernameValidation(req.body.username);
    if(!username.success)
    {
        return res.status(400).json({error: username.error});
    }
    if(players.has(username.data))
    {
        return res.status(400).json({error: "Username already taken."});
    }
    else
    {
        const token = jwt.sign({username: username.data}, "DecoreEvent", {expiresIn: "7d"});
        players.add(username.data);
        return res.status(200).json({token: token});
    }
}
