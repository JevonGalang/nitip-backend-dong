import bcrpyt from "bcrypt";
import e from "express";
import connection from "../conection.js";
import req from "../middleware/reqMiddleware.js";
import {nyari, post }from "../controller/iniPost.js"
const app = e.Router();


app.post("/", req ,post);
app.post("/nyari",req, nyari);

export default app;
