import e from "express";
import logs from "../middleware/logInput.js";
import { masuk, register } from "../controller/authController.js"
import { penambahanJadwal } from "../controller/scheduleController.js"
import { post, penambahanLog } from "../controller/logbookController.js"
import emailController from "../controller/supportController.js"
import { postHistorySchaduleCtrl, postHistoryLogbookCtrl, archiveScheduleCtrl } from "../controller/historyController.js"
import check from "../middleware/fieldCheck.js";
import { inputLogin } from "../middleware/checkInput.js";
import rateLimit from "express-rate-limit";
import validmid from "../middleware/validMiddleware.js"
import { aksesLab, hanyaAdmin, cekAksesJadwalParam, cekAksesJadwalBody, cekAksesLabBody } from "../middleware/rbacMiddleware.js"

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 5, 
	message: "Terlalu banyak permintaan, silakan coba lagi nanti.",
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
})

const app = e.Router();

// Endpoint publik untuk mahasiswa mengisi logbook tanpa akun
app.post("/public/logbook", limiter, penambahanLog)
app.post("/form", validmid, aksesLab, cekAksesJadwalBody, logs, check, post);
app.post("/login", inputLogin, logs,  masuk)
app.post("/formadmin", validmid, aksesLab, cekAksesLabBody, logs, penambahanJadwal)
app.post("/regist", validmid, hanyaAdmin, register)
app.post("/logbook", validmid, aksesLab, cekAksesJadwalBody, penambahanLog)
app.post("/pengaduan", emailController)
app.post("/history/schadule", validmid, aksesLab, cekAksesLabBody, logs, postHistorySchaduleCtrl)
app.post("/history/logbook", validmid, hanyaAdmin, logs, postHistoryLogbookCtrl)
app.post("/history/archive/:id", validmid, aksesLab, cekAksesJadwalParam, logs, archiveScheduleCtrl)

export default app;
