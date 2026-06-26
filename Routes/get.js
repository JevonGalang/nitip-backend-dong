import connection from "../config/conection.js"
import e from "express";
import logs from "../middleware/logInput.js";
import {history, lihatLogbook, lihatJadwal, lihatLab} from "../controller/alldatas.js"
import { getHistorySchaduleCtrl, getHistoryLogbookCtrl } from "../controller/historyController.js"

import validmid from "../middleware/validMiddleware.js"
const app =e.Router()

app.get("/",logs,history)
app.get("/penggunaanlab",logs ,history)
app.get("/lab", lihatLab)
app.get("/logbook", validmid, lihatLogbook)
app.get("/jadwal", validmid, lihatJadwal)
app.get("/history/schadule", validmid, getHistorySchaduleCtrl)
app.get("/history/logbook", validmid, getHistoryLogbookCtrl)

export default app; 