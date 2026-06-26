import db from "../config/conection.js"

async function getSchadule() {
    const sql = `
        SELECT 
            schadule.id,
            schadule.prodi_kelas,
            schadule.matkul,
            schadule.dosen,
            schadule.tanggal,
            schadule.jammulai,
            schadule.jamselesai,
            laboratorium.id_lab,
            laboratorium.nama_lab
        FROM schadule
        LEFT JOIN laboratorium ON schadule.lab_id = laboratorium.id_lab
    `
    try {
        const [hasil] = await db.query(sql)
        console.log(`models getSchadule say: Berhasil mengambil data jadwal (${hasil.length} baris)`);
        return hasil
    } catch (error) {
        console.error("models getSchadule say error: " + error)
        throw error
    }
}

export default getSchadule
