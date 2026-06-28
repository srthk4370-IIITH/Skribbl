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
        if(!req.body)
        {
            req.body={};
        }
        try
        {
            const username = jwt.verify(token, "DecoreEvent").username; //Hardcoded for now... show use .env
            if(players.has(username))
            {
                req.body.isAdmin = false;
                next();
            }
            else
            {
                    return res.status(401).json({error: "Username Not Found"});
            }
        }
        catch(e)
        {
            try
            {
                const admin = jwt.verify(token, "TheGoat").username;
                if(admin === "adminDecore")
                {
                    req.body.isAdmin = true;
                    next();
                }
            }
            catch(e)
            {
                return res.status(401).json({error: "Invalid Token. Sign In again : " + e});
            }
        }
    }
}