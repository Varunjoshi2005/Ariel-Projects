import type { Response, Request, RequestHandler } from "express";
import { userServices } from "../services/user";


class UserController {


    handleRegister: RequestHandler = (req: Request, res: Response) => {
        userServices.UserRegister(req, res);
    }

    handleLogin: RequestHandler = (req: Request, res: Response) => {
        userServices.UserLogin(req, res);
    }


}

const userController = new UserController();

export default userController;