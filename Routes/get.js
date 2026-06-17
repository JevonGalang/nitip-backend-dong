import connection from "../config/conection.js"
import e from "express";
import logs from "../middleware/logInput.js";
import {history} from "../controller/alldatas.js"

import validmid from "../middleware/validMiddleware.js"
const app =e.Router()

app.get("/",logs,history)
app.get("/timestamp", validmid,history)
export default app; 