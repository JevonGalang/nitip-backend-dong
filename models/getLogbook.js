import db from "../config/conection.js"

async function getLogbook() {
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
        console.log(`models getLogbook say: Berhasil mengambil data logbook (${hasil.length} baris)`);
        return hasil
    } catch (error) {
        console.error("models getLogbook say error: " + error)
        throw error
    }
}


export default getLogbook
