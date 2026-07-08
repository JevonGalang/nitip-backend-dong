import {
    getAllLogbooks,
    clearAllLogbooks,
    deleteLogbookById,
    createLogbook
} from "../models/logbookModel.js"
import { getScheduleByIdWithCapacity } from "../models/scheduleModel.js"

export async function getAllLogbooksService() {
    const hasilnya = await getAllLogbooks()
    return hasilnya
}

export async function clearAllLogbooksService() {
    const hasilnya = await clearAllLogbooks()
    return hasilnya
}

export async function deleteLogbookService(req) {
    const { id } = req.params;
    const hasilnya = await deleteLogbookById(id);

    if (hasilnya.affectedRows === 0){
        throw new Error("data dengan id tersebut tidak ditemukan")
    }

    return hasilnya;
}

export async function createLogbookService(req) {
    const { schadule, namaKetua, nim, kelas, jumlahPeserta, nomorWa } = req.body;
    
    // Validasi apakah jadwal (schadule) tersedia
    const targetSchedule = await getScheduleByIdWithCapacity(schadule)
    if (!targetSchedule) {
        throw new Error("Jadwal tidak ditemukan!")
    }

    // Validasi kapasitas laboratorium secara dinamis
    const kapasitas = targetSchedule.kapasitas || 0
    if (jumlahPeserta > kapasitas) {
        throw new Error(`Jumlah peserta (${jumlahPeserta}) melebihi kapasitas laboratorium (${kapasitas})!`)
    }

    const hasilnya = await createLogbook(schadule, namaKetua, nim, kelas, jumlahPeserta, nomorWa);
    return hasilnya;
}
