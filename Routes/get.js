import connection from "../config/conection.js"
import e from "express";
import send from "../middleware/reqMiddleware.js";
import {history} from "../controller/alldatas.js"

const app =e.Router()

app.get("/", history)
app.get("/timestamp", history)
export default app;