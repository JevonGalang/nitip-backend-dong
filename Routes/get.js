import e from "express";
import logs from "../middleware/logInput.js";
import { history, lihatJadwal, getSchaduleByJenisLab } from "../controller/scheduleController.js"
import { lihatLab, persentasePenggunaanLab } from "../controller/labController.js"
import { lihatLogbook } from "../controller/logbookController.js"
import { getHistorySchaduleCtrl, getHistoryLogbookCtrl, calculateHistoryUsageCtrl, getLatestHistoryScheduleCtrl } from "../controller/historyController.js"
import validmid from "../middleware/validMiddleware.js"
import { aksesLab } from "../middleware/rbacMiddleware.js"
import { lihatAksesSaya } from "../controller/rbacController.js"

const app = e.Router()

// Endpoint publik untuk mahasiswa, tidak membutuhkan akun atau JWT
app.get("/public/jadwal", logs, lihatJadwal)
app.get("/", validmid, aksesLab, logs, history)
app.get("/penggunaanlab", validmid, aksesLab, logs, history)
app.get("/lab", validmid, aksesLab, lihatLab)
app.get("/lab/persentase", validmid, aksesLab, logs , persentasePenggunaanLab)
app.get("/lab/persentase-semester", validmid, aksesLab, logs ,persentasePenggunaanLab)
app.get("/persentase-lab", validmid, aksesLab, persentasePenggunaanLab)
app.get("/rbac/saya", validmid, lihatAksesSaya)
app.get("/logbook", validmid, aksesLab, lihatLogbook)
app.get("/jadwal", validmid, aksesLab, lihatJadwal)
app.get("/history/schadule", validmid, aksesLab, getHistorySchaduleCtrl)
app.get("/history/logbook", validmid, aksesLab, getHistoryLogbookCtrl)
app.get("/history/perhitungan", calculateHistoryUsageCtrl)
app.get("/history/persentase", validmid, aksesLab, logs, calculateHistoryUsageCtrl)
app.get("/history/terbaru", validmid, aksesLab, logs, getLatestHistoryScheduleCtrl)
app.get("/history/latest", validmid, aksesLab, logs, getLatestHistoryScheduleCtrl)
app.get("/jadwal/jenis/:jenis_lab", validmid, aksesLab, getSchaduleByJenisLab)
app.get("/jadwal/:jadwal", validmid, aksesLab, getSchaduleByJenisLab)

export default app;


    