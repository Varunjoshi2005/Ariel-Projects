import { Config } from "./config";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoute from "./routers/userRoutes";
import http from "http";
dotenv.config();

const startServer = async () => {
    try {
        const app = express();
        const server = http.createServer(app);

         mongoose.connect(Config.mongodbUrl)
         .then(() => console.log("mongodb connnected!!"))
         .catch((err) => console.error(err));
         


        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors({
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }));


        app.use("/account" , UserRoute);



        server.listen(Config.port, () => {
            console.log(`Server running on port : ${Config.port}!!`);
        })

    } catch (error) {
        console.log(`Some internal Error failed to start server : ${error.message}`);
    }
}


startServer();