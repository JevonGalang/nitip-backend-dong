import db from "../config/conection.js"

export async function getFilteredHistorySchedules(filters = {}) {
    const { month, year, semester, sort = 'DESC', lab_id } = filters;
    const whereConditions = [];
    const params = [];

    if (month) {
        if (typeof month === 'string' && month.includes('-')) {
            const [y, m] = month.split('-');
            whereConditions.push("YEAR(history_schadule.tanggal) = ? AND MONTH(history_schadule.tanggal) = ?");
            params.push(parseInt(y, 10), parseInt(m, 10));
        } else {
            whereConditions.push("MONTH(history_schadule.tanggal) = ?");
            params.push(parseInt(month, 10));
        }
    }

    if (year && (!month || !month.toString().includes('-'))) {
        whereConditions.push("YEAR(history_schadule.tanggal) = ?");
        params.push(parseInt(year, 10));
    }

    if (semester) {
        const sem = semester.toString().toLowerCase();
        if (sem === '1' || sem === 'ganjil') {
            // Semester 1: Agustus - Januari (Bulan 8, 9, 10, 11, 12, 1)
            whereConditions.push("MONTH(history_schadule.tanggal) IN (8, 9, 10, 11, 12, 1)");
        } else if (sem === '2' || sem === 'genap') {
            // Semester 2: Februari - Agustus (Bulan 2, 3, 4, 5, 6, 7, 8)
            whereConditions.push("MONTH(history_schadule.tanggal) IN (2, 3, 4, 5, 6, 7, 8)");
        }
    }

    if (lab_id) {
        whereConditions.push("history_schadule.lab_id = ?");
        params.push(lab_id);
    }

    const whereClause = whereConditions.length > 0 ? "WHERE " + whereConditions.join(" AND ") : "";
    const sortOrder = sort.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const sql = `
        SELECT 
            history_schadule.id,
            history_schadule.lab_id,
            history_schadule.prodi_kelas,
            history_schadule.matkul,
            history_schadule.dosen,
            history_schadule.tanggal,
            history_schadule.jammulai,
            history_schadule.jamselesai,
            history_schadule.is_auto,
            laboratorium.id_lab,
            laboratorium.nama_lab,
            (SELECT COUNT(*) FROM history_logbook hl WHERE hl.schadules = history_schadule.id) AS total_logbook,
            CASE 
                WHEN EXISTS (SELECT 1 FROM history_logbook hl WHERE hl.schadules = history_schadule.id) 
                THEN 'DIPESAN' 
                ELSE 'BELUM DIPESAN' 
            END AS status_pesanan,
            CASE 
                WHEN EXISTS (SELECT 1 FROM history_logbook hl WHERE hl.schadules = history_schadule.id) 
                THEN TRUE 
                ELSE FALSE 
            END AS is_booked
        FROM history_schadule
        LEFT JOIN laboratorium ON history_schadule.lab_id = laboratorium.id_lab
        ${whereClause}
        ORDER BY history_schadule.tanggal ${sortOrder}, history_schadule.jammulai ${sortOrder}
    `
    try {
        const [hasil] = await db.query(sql, params)
        console.log(`models historyModel say: Berhasil mengambil data history jadwal dengan filter (${hasil.length} baris)`);
        return hasil
    } catch (error) {
        console.error("models historyModel say error in getFilteredHistorySchedules: " + error)
        throw error
    }
}

export async function getFilteredHistoryLogbooks(filters = {}) {
    const { month, year, semester, sort = 'DESC', lab_id } = filters;
    const whereConditions = [];
    const params = [];

    if (month) {
        if (typeof month === 'string' && month.includes('-')) {
            const [y, m] = month.split('-');
            whereConditions.push("YEAR(history_schadule.tanggal) = ? AND MONTH(history_schadule.tanggal) = ?");
            params.push(parseInt(y, 10), parseInt(m, 10));
        } else {
            whereConditions.push("MONTH(history_schadule.tanggal) = ?");
            params.push(parseInt(month, 10));
        }
    }

    if (year && (!month || !month.toString().includes('-'))) {
        whereConditions.push("YEAR(history_schadule.tanggal) = ?");
        params.push(parseInt(year, 10));
    }

    if (semester) {
        const sem = semester.toString().toLowerCase();
        if (sem === '1' || sem === 'ganjil') {
            whereConditions.push("MONTH(history_schadule.tanggal) IN (8, 9, 10, 11, 12, 1)");
        } else if (sem === '2' || sem === 'genap') {
            whereConditions.push("MONTH(history_schadule.tanggal) IN (2, 3, 4, 5, 6, 7, 8)");
        }
    }

    if (lab_id) {
        whereConditions.push("history_schadule.lab_id = ?");
        params.push(lab_id);
    }

    const whereClause = whereConditions.length > 0 ? "WHERE " + whereConditions.join(" AND ") : "";
    const sortOrder = sort.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

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
        ${whereClause}
        ORDER BY history_schadule.tanggal ${sortOrder}, history_schadule.jammulai ${sortOrder}
    `
    try {
        const [hasil] = await db.query(sql, params)
        console.log(`models historyModel say: Berhasil mengambil data history logbook dengan filter (${hasil.length} baris)`);
        return hasil
    } catch (error) {
        console.error("models historyModel say error in getFilteredHistoryLogbooks: " + error)
        throw error
    }
}

export async function getHistorySchedules(filters = {}) {
    return await getFilteredHistorySchedules(filters)
}

export async function getHistoryLogbooks(filters = {}) {
    return await getFilteredHistoryLogbooks(filters)
}

export async function createHistorySchedule(lab_id, prodi_kelas, matkul, dosen, tanggal, jammulai, jamselesai, is_auto = 0) {
    const sql = "INSERT INTO history_schadule (lab_id, prodi_kelas, matkul, dosen, tanggal, jammulai, jamselesai, is_auto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    try {
        const [hasil] = await db.query(sql, [lab_id, prodi_kelas, matkul, dosen, tanggal, jammulai, jamselesai, is_auto])
        console.log(`models historyModel say: Berhasil menambahkan history jadwal (ID: ${hasil.insertId})`);
        return hasil
    } catch (error) {
        console.error(`models historyModel say error: Gagal menambahkan history jadwal. Error: ${error}`);
        throw error;
    }
}

export async function createHistoryLogbook(schadules, namaMahasiswa, nim, kelas, jumlah_hadir, no_wa) {
    if (!schadules) {
        throw new Error("Foreign Key schadules (ID History Schadule) wajib diisi dan tidak boleh NULL!");
    }
    const sql = "INSERT INTO history_logbook (schadules, namaMahasiswa, nim, kelas, jumlah_hadir, no_wa) VALUES (?, ?, ?, ?, ?, ?)"
    try {
        const [hasil] = await db.query(sql, [schadules, namaMahasiswa, nim, kelas, jumlah_hadir, no_wa])
        console.log(`models historyModel say: Berhasil menambahkan history logbook untuk ${namaMahasiswa} (ID: ${hasil.insertId})`);
        return hasil
    } catch (error) {
        console.error(`models historyModel say error: Gagal menambahkan history logbook. Error: ${error}`);
        throw error;
    }
}

export async function archiveScheduleTransaction(scheduleId) {
    const conn = await db.getConnection();
    try {
        // 1. Ambil data schedule aktif
        const [scheduleRows] = await conn.query("SELECT * FROM schadule WHERE id = ?", [scheduleId]);
        if (scheduleRows.length === 0) {
            throw new Error("Jadwal tidak ditemukan!");
        }
        const sch = scheduleRows[0];

        // 2. Ambil data logbook aktif yang berelasi
        const [logbookRows] = await conn.query("SELECT * FROM logbook WHERE schadules = ?", [scheduleId]);

        // 3. Mulai Transaksi
        await conn.beginTransaction();

        // 4. Salin ke history_schadule (biarkan MySQL AUTO_INCREMENT id baru secara otomatis)
        const [resSch] = await conn.query(
            "INSERT INTO history_schadule (lab_id, prodi_kelas, matkul, dosen, tanggal, jammulai, jamselesai, is_auto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [sch.lab_id, sch.prodi_kelas, sch.matkul, sch.dosen, sch.tanggal, sch.jammulai, sch.jamselesai, sch.is_auto ?? 0]
        );
        const newHistoryScheduleId = resSch.insertId;

        // 5. Salin ke history_logbook terikat ke id history_schadule baru
        for (const log of logbookRows) {
            await conn.query(
                "INSERT INTO history_logbook (schadules, namaMahasiswa, nim, kelas, jumlah_hadir, no_wa) VALUES (?, ?, ?, ?, ?, ?)",
                [newHistoryScheduleId, log.namaMahasiswa, log.nim, log.kelas, log.jumlah_hadir, log.no_wa]
            );
        }

        // 6. Hapus data dari tabel aktif
        await conn.query("DELETE FROM logbook WHERE schadules = ?", [scheduleId]);
        await conn.query("DELETE FROM schadule WHERE id = ?", [scheduleId]);

        // 7. Commit Transaksi
        await conn.commit();
        console.log(`models historyModel say: Berhasil mengarsipkan jadwal ID ${scheduleId} (menjadi history_schadule ID ${newHistoryScheduleId}) beserta ${logbookRows.length} logbook terkait ke history`);
        return { scheduleId, newHistoryScheduleId, archivedLogbooksCount: logbookRows.length };
    } catch (error) {
        await conn.rollback();
        console.error(`models historyModel say error in archiveScheduleTransaction: ${error}`);
        throw error;
    } finally {
        conn.release();
    }
}
