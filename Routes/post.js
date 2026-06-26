
import e from "express";
import logs from "../middleware/logInput.js";
import { post, masuk, penambahanJadwal, register, penambahanLog}from "../controller/loginAndbooking.js"
import check from "../middleware/fieldCheck.js";
import { inputLogin } from "../middleware/checkInput.js";
import rateLimit from "express-rate-limit";
import emailController from "../controller/emails.js"
import validmid from "../middleware/validMiddleware.js"
import { postHistorySchaduleCtrl, postHistoryLogbookCtrl } from "../controller/historyController.js"

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 5, 
	message: "Terlalu banyak permintaan, silakan coba lagi nanti.",
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
})

const app = e.Router();


app.post("/form", logs, check ,post);
app.post("/login",inputLogin,logs ,limiter ,masuk)
app.post("/formadmin", logs,penambahanJadwal )
app.post("/regist", register)
app.post("/logbook",penambahanLog )
app.post("/pengaduan", emailController)
app.post("/history/schadule", validmid, logs, postHistorySchaduleCtrl)
app.post("/history/logbook", validmid, logs, postHistoryLogbookCtrl)

export default app;
