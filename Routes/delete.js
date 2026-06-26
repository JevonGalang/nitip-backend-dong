import e from "express";
import { hapus, bersihkanJadwal, bersihkanLogbook, hapusLogbookById } from "../controller/alldatas.js";
import validmid from "../middleware/validMiddleware.js";

const app = e.Router();

app.delete("/jadwal/clear", validmid, bersihkanJadwal);
app.delete("/logbook/clear", validmid, bersihkanLogbook);
app.delete("/logbook/:id", validmid, hapusLogbookById);
app.delete("/:id", validmid, hapus);

export default app;

