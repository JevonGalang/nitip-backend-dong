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

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 5, 
	message: "Terlalu banyak permintaan, silakan coba lagi nanti.",
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
})

const app = e.Router();

app.post("/form", logs, check, post);
app.post("/login", inputLogin, logs,  masuk)
app.post("/formadmin", logs, penambahanJadwal)
app.post("/regist", register)
app.post("/logbook", penambahanLog)
app.post("/pengaduan", emailController)
app.post("/history/schadule", validmid, logs, postHistorySchaduleCtrl)
app.post("/history/logbook", validmid, logs, postHistoryLogbookCtrl)
app.post("/history/archive/:id", validmid, logs, archiveScheduleCtrl)

export default app;
