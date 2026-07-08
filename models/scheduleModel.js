import db from "../config/conection.js"

export async function getAllSchedules() {
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
        console.log(`models scheduleModel say: Berhasil mengambil data jadwal (${hasil.length} baris)`);
        return hasil
    } catch (error) {
        console.error("models scheduleModel say error: " + error)
        throw error
    }
}

export async function clearAllSchedules() {
    const sql = "DELETE FROM schadule"
    try {
        const [hasil] = await db.query(sql)
        console.log(`models scheduleModel say: Berhasil menghapus semua data jadwal (${hasil.affectedRows} baris dihapus)`);
        return hasil
    } catch (error) {
        console.error("models scheduleModel say error: " + error)
        throw error
    }
}

export async function deleteScheduleById(id) {
    const conn = await db.getConnection()
    try {
        await conn.beginTransaction()
        // Hapus logbook terkait terlebih dahulu (cascade delete)
        await conn.query("DELETE FROM logbook WHERE schadules = ?", [id])
        
        // Hapus jadwal utama
        const [hasil] = await conn.query("DELETE FROM schadule WHERE id = ?", [id])
        
        await conn.commit()
        
        if (hasil.affectedRows > 0) {
            console.log(`models scheduleModel say: Berhasil menghapus data dengan id ${id} beserta logbook terkait`);
        } else {
            console.log(`models scheduleModel say: Percobaan hapus selesai, tapi data dengan id ${id} tidak ditemukan`);
        }
        return hasil;
    } catch (error) {
        await conn.rollback()
        console.error(`models scheduleModel say error: Gagal menghapus data dengan id ${id}. Error: ${error}`);
        throw error;
    } finally {
        conn.release()
    }
}

export async function getSchedulesByLabType(jenislab) {
    const sql = "SELECT * FROM schadule INNER JOIN laboratorium ON schadule.lab_id = laboratorium.id_lab WHERE laboratorium.jenis_lab = ?"
    try {
        const [hasil] = await db.query(sql, [jenislab])
        return hasil
    } catch (error) {
        console.error("models scheduleModel say error: ", error)
        throw error
    }
}

export async function createSchedule(labnya, prodinya, matkulnya, dosennya, tanggalnya, jammulainya, jamselesainya) {
    const sql = "INSERT INTO schadule (id, lab_id, prodi_kelas, matkul, dosen, tanggal, jammulai, jamselesai) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)"
    try {
        const [nambahin] = await db.query(sql, [labnya, prodinya, matkulnya, dosennya, tanggalnya, jammulainya, jamselesainya])
        console.log(`models scheduleModel say: Berhasil menambahkan jadwal kuliah untuk matkul ${matkulnya}`);
        return nambahin
    } catch (error) {
        console.error(`models scheduleModel say error: Gagal menambahkan jadwal. Error: ${error}`);
        throw error;
    }
}

export async function getSchedulesWithLab() {
    const sql = "SELECT * FROM schadule LEFT JOIN laboratorium ON schadule.lab_id = laboratorium.id_lab"
    try {
        const [query] = await db.query(sql)
        console.log("models scheduleModel say: Berhasil mengambil data users + lab");
        return query
    } catch (error) {
        console.error("models scheduleModel say error: " + error)
        throw error
    }
}

export async function checkScheduleOverlap(lab_id, tanggal, jammulai, jamselesai) {
    const sql = `
        SELECT * FROM schadule 
        WHERE lab_id = ? 
          AND tanggal = ? 
          AND jammulai < ? 
          AND jamselesai > ?
    `
    try {
        const [hasil] = await db.query(sql, [lab_id, tanggal, jamselesai, jammulai])
        return hasil
    } catch (error) {
        console.error("models scheduleModel say error in checkScheduleOverlap: " + error)
        throw error
    }
}

export async function getScheduleByIdWithCapacity(id) {
    const sql = `
        SELECT schadule.*, laboratorium.kapasitas 
        FROM schadule 
        LEFT JOIN laboratorium ON schadule.lab_id = laboratorium.id_lab 
        WHERE schadule.id = ?
    `
    try {
        const [hasil] = await db.query(sql, [id])
        return hasil[0] || null
    } catch (error) {
        console.error("models scheduleModel say error in getScheduleByIdWithCapacity: " + error)
        throw error
    }
}
