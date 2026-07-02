import {
    getAllLogbooks,
    clearAllLogbooks,
    deleteLogbookById,
    createLogbook
} from "../models/logbookModel.js"

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
    
    if (jumlahPeserta > 36) {
        return { pesan: "jumlah pesertanyanya gak ngotak mas" }
    }

    const hasilnya = await createLogbook(schadule, namaKetua, nim, kelas, jumlahPeserta, nomorWa);
    return hasilnya;
}
