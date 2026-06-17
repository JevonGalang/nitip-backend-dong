
import e from "express";
import logs from "../middleware/logInput.js";
import { post }from "../controller/loginAndbooking.js"
import {  masuk } from "../controller/loginAndbooking.js";
import check from "../middleware/fieldCheck.js";
import { inputLogin } from "../middleware/checkInput.js";
const app = e.Router();


app.post("/form", logs, check ,post);
app.post("/login",inputLogin ,masuk)

// app.post("/nyari", req, nyari);

export default app;
