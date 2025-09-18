import type { Response, Request } from "express";
import auth from "../authentication/auth";
import UserModel from "../models/userDoc";
import bcrypt from "bcryptjs";
import { TokenUser } from "../types";
import RoleModel from "../models/roleDoc";
import UserRoleModel from "../models/userRoleDoc";

class UserServices {
  UserRegister = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const profileImage = req.file;

      if (!username || !email || !password) {
        res.status(404).json({ error: "fields are missing !! " });
        return;
      }
      const newUser = new UserModel();
      const roleModel = new RoleModel();
      const userRole = new UserRoleModel();

      newUser.username = username;
      newUser.email = email;
      const hashPassword = await bcrypt.hash(password, 10);
      newUser.password = hashPassword;

      const role = await roleModel.save();
      newUser.roleId = role._id;

      if (profileImage) {
        // TODO : add the profile Image logic
      }

      const user = await newUser.save();
      userRole.userId = user._id;
      userRole.roleId = role._id;

      await userRole.save();

      res.status(202).json({ message: "user registered!!" });
      return;
    } catch (error) {
      res.status(505).json({ error: `Internal server error` });
      return;
    }
  };

  UserLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(404).json({ error: "Email or Password Missing!!" });
        return;
      }

      const currentUser = await UserModel.findOne({ email: email }).populate(
        "roleId"
      );
      let user: any = currentUser;

      if (!currentUser) {
        res
          .status(404)
          .json({ error: "User with this email doesn't exists!!" });
        return;
      }

      const verifyPassword = await bcrypt.compare(
        password,
        currentUser.password
      );
      if (!verifyPassword) {
        res.status(404).json({ error: "Invalid Passcode !!" });
        return;
      }

      const userData: TokenUser = {
        id: currentUser._id,
        username: currentUser.username,
        email: currentUser.email,
        role: user.roleId.roleName,
      };

      const data = auth.GenerateToken(userData);
      if (!data.success) {
        res.status(505).json({ error: "failed to login !!" });
        return;
      }

      res
        .status(200)
        .json({ message: "logged in Successfully!!", data: data.data });
      return;
    } catch (error) {
      res.status(505).json({ error: `Internal server error ${error.message}` });
      return;
    }
  };
}

export const userServices = new UserServices();

export default UserServices;
