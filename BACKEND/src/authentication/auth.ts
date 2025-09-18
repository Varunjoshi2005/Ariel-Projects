import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Config } from "../config";
import { AuthRequest, TokenUser } from "../types";
class Authentication {


    AuthenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {

        const authHeaders = req.headers["authorization"];
        const token = authHeaders && authHeaders.split(" ")[1];

        if (!token) {
            res.status(404).json({ error: "Token is not there!!" });
            return;
        }

        jwt.verify(token, Config.jwtKey, (err, user) => {
            if (err) {
                res.status(404).json({ error: `Invalid token : ${err.message}` })
            }
            req.user = user;
            next();
        })

    }


    GenerateToken(user: TokenUser) {
        try {
            if (!user) return { data: null, success: false }

            const token = jwt.sign(user, Config.jwtKey, { expiresIn: "1hr" });
            const userWithToken = {
                ...user,
                token
            }
            return {
                data: userWithToken,
                success: true
            }

        } catch (error) {
            return { data: null, success: false }
        }
    }

}

export default new Authentication;