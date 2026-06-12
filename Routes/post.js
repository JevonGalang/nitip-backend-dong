
import e from "express";
import logs from "../middleware/logInput.js";
import { post }from "../controller/loginAndbooking.js"

const app = e.Router();


app.post("/", logs ,post);
// app.post("/nyari", req, nyari);

export default app;
