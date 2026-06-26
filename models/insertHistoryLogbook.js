import db from "../config/conection.js"

const insertHistoryLogbook = async (id, schadules, namaMahasiswa, nim, kelas, jumlah_hadir, no_wa) => {
    const sql = "INSERT INTO history_logbook (id, schadules, namaMahasiswa, nim, kelas, jumlah_hadir, no_wa) VALUES (?, ?, ?, ?, ?, ?, ?)"
    try {
        const [hasil] = await db.query(sql, [id || null, schadules, namaMahasiswa, nim, kelas, jumlah_hadir, no_wa])
        console.log(`models insertHistoryLogbook say: Berhasil menambahkan history logbook untuk ${namaMahasiswa} (ID: ${hasil.insertId || id})`);
        return hasil
    } catch (error) {
        console.error(`models insertHistoryLogbook say error: Gagal menambahkan history logbook. Error: ${error}`);
        throw error;
    }
}

export default insertHistoryLogbook
