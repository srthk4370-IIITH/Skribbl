import { auth } from "../auth/auth";
import { Router } from "express";

export const authRouter = Router();

authRouter.post("/auth", auth);
