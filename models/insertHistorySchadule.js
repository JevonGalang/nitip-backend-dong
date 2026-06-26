import db from "../config/conection.js"

const insertHistorySchadule = async (id, lab_id, prodi_kelas, matkul, dosen, tanggal, jammulai, jamselesai) => {
    const sql = "INSERT INTO history_schadule (id, lab_id, prodi_kelas, matkul, dosen, tanggal, jammulai, jamselesai) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    try {
        const [hasil] = await db.query(sql, [id || null, lab_id, prodi_kelas, matkul, dosen, tanggal, jammulai, jamselesai])
        console.log(`models insertHistorySchadule say: Berhasil menambahkan history jadwal (ID: ${hasil.insertId || id})`);
        return hasil
    } catch (error) {
        console.error(`models insertHistorySchadule say error: Gagal menambahkan history jadwal. Error: ${error}`);
        throw error;
    }
}

export default insertHistorySchadule
