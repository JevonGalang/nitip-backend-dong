import db from "../config/conection.js"

export async function getAllLogbooks() {
    const sql = `
        SELECT 
            logbook.id,
            logbook.namaMahasiswa,
            logbook.nim,
            logbook.kelas,
            logbook.jumlah_hadir,
            logbook.no_wa,
            schadule.id AS schadule_id,
            schadule.prodi_kelas,
            schadule.matkul,
            schadule.dosen,
            schadule.tanggal,
            schadule.jammulai,
            schadule.jamselesai,
            laboratorium.id_lab,
            laboratorium.nama_lab
        FROM logbook
        LEFT JOIN schadule ON logbook.schadules = schadule.id
        LEFT JOIN laboratorium ON schadule.lab_id = laboratorium.id_lab
    `
    try {
        const [hasil] = await db.query(sql)
        console.log(`models logbookModel say: Berhasil mengambil data logbook (${hasil.length} baris)`);
        return hasil
    } catch (error) {
        console.error("models logbookModel say error: " + error)
        throw error
    }
}

export async function clearAllLogbooks() {
    const sql = "DELETE FROM logbook"
    try {
        const [hasil] = await db.query(sql)
        console.log(`models logbookModel say: Berhasil menghapus semua data logbook (${hasil.affectedRows} baris dihapus)`);
        return hasil
    } catch (error) {
        console.error("models logbookModel say error: " + error)
        throw error
    }
}

export async function deleteLogbookById(id) {
    const sql = "DELETE FROM logbook WHERE id = ?"
    try {
        const [hasil] = await db.query(sql, [id])
        if (hasil.affectedRows > 0) {
            console.log(`models logbookModel say: Berhasil menghapus data dengan id ${id}`);
        } else {
            console.log(`models logbookModel say: Percobaan hapus selesai, tapi data dengan id ${id} tidak ditemukan`);
        }
        return hasil;
    } catch (error) {
        console.error(`models logbookModel say error: Gagal menghapus data dengan id ${id}. Error: ${error}`);
        throw error;
    }
}

export async function createLogbook(schadule, namaKetua, nim, kelas, jumlahPeserta, nomorWa) {
    const sql = "INSERT INTO logbook (schadules, namaMahasiswa, nim, kelas, jumlah_hadir, no_wa) VALUES (?, ?, ?, ?, ?, ?)"
    try {
        const [hasil] = await db.query(sql, [schadule, namaKetua, nim, kelas, jumlahPeserta, nomorWa])
        console.log(`models logbookModel say: Berhasil menginput logbook untuk mahasiswa ${namaKetua} (NIM: ${nim})`);
        return hasil
    } catch (error) {
        console.error(`models logbookModel say error: Gagal menginput logbook. Error: ${error}`);
        throw error;
    }
}
