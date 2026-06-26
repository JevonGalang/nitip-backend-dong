import db from "../config/conection.js"

async function getHistorySchadule() {
    const sql = `
        SELECT 
            history_schadule.id,
            history_schadule.prodi_kelas,
            history_schadule.matkul,
            history_schadule.dosen,
            history_schadule.tanggal,
            history_schadule.jammulai,
            history_schadule.jamselesai,
            laboratorium.id_lab,
            laboratorium.nama_lab
        FROM history_schadule
        LEFT JOIN laboratorium ON history_schadule.lab_id = laboratorium.id_lab
        ORDER BY history_schadule.tanggal DESC
    `
    try {
        const [hasil] = await db.query(sql)
        console.log(`models getHistorySchadule say: Berhasil mengambil data history jadwal (${hasil.length} baris)`);
        return hasil
    } catch (error) {
        console.error("models getHistorySchadule say error: " + error)
        throw error
    }
}

export default getHistorySchadule
