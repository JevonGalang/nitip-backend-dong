import db from "../config/conection.js"

export async function getHistorySchedules() {
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
        console.log(`models historyModel say: Berhasil mengambil data history jadwal (${hasil.length} baris)`);
        return hasil
    } catch (error) {
        console.error("models historyModel say error: " + error)
        throw error
    }
}

export async function getHistoryLogbooks() {
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
        console.log(`models historyModel say: Berhasil mengambil data history logbook (${hasil.length} baris)`);
        return hasil
    } catch (error) {
        console.error("models historyModel say error: " + error)
        throw error
    }
}

export async function createHistorySchedule(id, lab_id, prodi_kelas, matkul, dosen, tanggal, jammulai, jamselesai) {
    const sql = "INSERT INTO history_schadule (id, lab_id, prodi_kelas, matkul, dosen, tanggal, jammulai, jamselesai) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    try {
        const [hasil] = await db.query(sql, [id || null, lab_id, prodi_kelas, matkul, dosen, tanggal, jammulai, jamselesai])
        console.log(`models historyModel say: Berhasil menambahkan history jadwal (ID: ${hasil.insertId || id})`);
        return hasil
    } catch (error) {
        console.error(`models historyModel say error: Gagal menambahkan history jadwal. Error: ${error}`);
        throw error;
    }
}

export async function createHistoryLogbook(id, schadules, namaMahasiswa, nim, kelas, jumlah_hadir, no_wa) {
    const sql = "INSERT INTO history_logbook (id, schadules, namaMahasiswa, nim, kelas, jumlah_hadir, no_wa) VALUES (?, ?, ?, ?, ?, ?, ?)"
    try {
        const [hasil] = await db.query(sql, [id || null, schadules, namaMahasiswa, nim, kelas, jumlah_hadir, no_wa])
        console.log(`models historyModel say: Berhasil menambahkan history logbook untuk ${namaMahasiswa} (ID: ${hasil.insertId || id})`);
        return hasil
    } catch (error) {
        console.error(`models historyModel say error: Gagal menambahkan history logbook. Error: ${error}`);
        throw error;
    }
}
