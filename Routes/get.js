import e from "express";
import logs from "../middleware/logInput.js";
import { history, lihatJadwal, getSchaduleByJenisLab } from "../controller/scheduleController.js"
import { lihatLab, persentasePenggunaanLab } from "../controller/labController.js"
import { lihatLogbook } from "../controller/logbookController.js"
import { getHistorySchaduleCtrl, getHistoryLogbookCtrl } from "../controller/historyController.js"
import validmid from "../middleware/validMiddleware.js"

const app = e.Router()

app.get("/", logs, history)
app.get("/penggunaanlab", logs, history)
app.get("/lab", lihatLab)
app.get("/lab/persentase",logs , persentasePenggunaanLab)
app.get("/lab/persentase-semester",logs ,persentasePenggunaanLab)
app.get("/persentase-lab", persentasePenggunaanLab)
app.get("/logbook", validmid, lihatLogbook)
app.get("/jadwal", validmid, lihatJadwal)
app.get("/history/schadule", validmid, getHistorySchaduleCtrl)
app.get("/history/logbook", validmid, getHistoryLogbookCtrl)
app.get("/jadwal/jenis/:jenis_lab", getSchaduleByJenisLab)
app.get("/jadwal/:jadwal", getSchaduleByJenisLab)

export default app;