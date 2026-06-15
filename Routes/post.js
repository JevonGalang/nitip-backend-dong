
import e from "express";
import logs from "../middleware/logInput.js";
import { post }from "../controller/loginAndbooking.js"
import { register, masuk } from "../controller/loginAndbooking.js";
const app = e.Router();


app.post("/", logs ,post);
app.post("/register", register)
app.post("/login", masuk)

// app.post("/nyari", req, nyari);

export default app;
