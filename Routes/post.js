import bcrpyt from "bcrypt";
import e from "express";
// import connection from "../services/conection.js";
import req from "../middleware/reqMiddleware.js";
import {nyari, post }from "../controller/loginAndRegist.js"
const app = e.Router();


app.post("/",  post);
// app.post("/nyari", req, nyari);

export default app;
