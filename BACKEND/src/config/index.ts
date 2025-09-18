import dotenv from "dotenv";
import multer, { memoryStorage } from "multer";
dotenv.config();

const Config = {
  port: process.env.PORT!,
  jwtKey: process.env.JWT_KEY!,
  mongodbUrl: process.env.MONGODB_URI!,
  adminKey: process.env.ADMIN_KEY!,
  superAdminKey: process.env.SUPER_ADMIN_KEY!,
};

const upload = multer({ storage: memoryStorage() });

export { Config, upload };
