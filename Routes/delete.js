import e from "express";
import { hapus, bersihkanJadwal } from "../controller/scheduleController.js";
import { bersihkanLogbook, hapusLogbookById } from "../controller/logbookController.js";
import validmid from "../middleware/validMiddleware.js";
import { aksesLab, hanyaAdmin, cekAksesJadwalParam, cekAksesLogbookParam } from "../middleware/rbacMiddleware.js";

const app = e.Router();

app.delete("/jadwal/clear", validmid, hanyaAdmin, bersihkanJadwal);
app.delete("/logbook/clear", validmid, hanyaAdmin, bersihkanLogbook);
app.delete("/logbook/:id", validmid, aksesLab, cekAksesLogbookParam, hapusLogbookById);
app.delete("/:id", validmid, aksesLab, cekAksesJadwalParam, hapus);

export default app;
