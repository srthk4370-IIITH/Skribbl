import type {Response, Request, NextFunction} from 'express';
import jwt from "jsonwebtoken";
import { players } from "../utils/data"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.slice(7);
    if(!token)
    {
        return res.status(401).json({error: "Token Not Found. Sign In again"})
    }
    else
    {
        try
        {
            const username = jwt.verify(token, "DecoreEvent").username;
            if(players.has(username))
            {
                next();
            }
            else
            {
                return res.status(401).json({error: "Invalid Token. Sign In again"});
            }
        }
        catch
        {
            return res.status(401).json({error: "Invalid Token. Sign In again"});
        }
    }
}