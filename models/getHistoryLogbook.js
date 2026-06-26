import db from "../config/conection.js"

async function getHistoryLogbook() {
    const sql = `
        SELECT 
            history_logbook.id,
            history_logbook.namaMahasiswa,
            history_logbook.nim,
            history_logbook.kelas,
            history_logbook.jumlah_hadir,
            history_logbook.no_wa,
            history_schadule.id AS schadule_id,
            history_schadule.prodi_kelas,
            history_schadule.matkul,
            history_schadule.dosen,
            history_schadule.tanggal,
            history_schadule.jammulai,
            history_schadule.jamselesai,
            laboratorium.id_lab,
            laboratorium.nama_lab
        FROM history_logbook
        LEFT JOIN history_schadule ON history_logbook.schadules = history_schadule.id
        LEFT JOIN laboratorium ON history_schadule.lab_id = laboratorium.id_lab
        ORDER BY history_schadule.tanggal DESC
    `
    try {
        const [hasil] = await db.query(sql)
        console.log(`models getHistoryLogbook say: Berhasil mengambil data history logbook (${hasil.length} baris)`);
        return hasil
    } catch (error) {
        console.error("models getHistoryLogbook say error: " + error)
        throw error
    }
}

export default getHistoryLogbook
