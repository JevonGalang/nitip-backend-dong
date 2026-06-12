import connection from "../config/conection.js"
import e from "express";
import logs from "../middleware/logInput.js";
import {history} from "../controller/alldatas.js"
import { input } from "../middleware/checkInput.js";
const app =e.Router()

app.get("/",input,history)
app.get("/timestamp",input ,history)
export default app;