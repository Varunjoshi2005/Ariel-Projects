import { Request } from "express";
import mongoose from "mongoose";

interface AuthRequest extends Request {
  user?: any;
}

interface TokenUser {
  id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  role: string;
}

export { AuthRequest, TokenUser };
