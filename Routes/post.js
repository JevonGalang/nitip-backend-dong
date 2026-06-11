
import e from "express";
import req from "../middleware/reqMiddleware.js";
import { post }from "../controller/loginAndbooking.js"

const app = e.Router();


app.post("/",  post);
// app.post("/nyari", req, nyari);

export default app;
