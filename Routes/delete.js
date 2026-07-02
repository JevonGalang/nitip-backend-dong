import e from "express";
import { hapus, bersihkanJadwal } from "../controller/scheduleController.js";
import { bersihkanLogbook, hapusLogbookById } from "../controller/logbookController.js";
import validmid from "../middleware/validMiddleware.js";

const app = e.Router();

app.delete("/jadwal/clear", validmid, bersihkanJadwal);
app.delete("/logbook/clear", validmid, bersihkanLogbook);
app.delete("/logbook/:id", validmid, hapusLogbookById);
app.delete("/:id", validmid, hapus);

export default app;
