//import limiter from "./middleware/rateLimiter.js";
//import errorHandler from "./middleware/errorHandler.js";
//import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
//import helmet from "helmet";
//import cors from "cors";
import apiRoutes from "./api/routes.js";
import { connectMongo } from "./config/mongo.js";
import { connectTurso } from "./config/turso.js";


const port = process.env.PORT || 3003 ;
const app = express();

dotenv.config();

app.use(express.json());

app.use("/", apiRoutes());

( async () => {
    try {
        await connectMongo();
        await connectTurso();
    } catch(err) {
        console.error("Startup error:",err);
        process.exit(1);                        //ให้จบการทำงาน
    }
})();

app.listen(port, () => {
    console.log(`Server is running on port ${port}✅`)
});

