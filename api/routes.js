import express from "express";
import mongoUsers from "./mongo/users.js";



export default () => {
    const router = express.Router();
    router.use("/mongo", mongoUsers);
    return router;
};

