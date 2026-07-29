import db from "../config/conection.js"

export async function getAllLabs() {
    const sql = "SELECT * FROM laboratorium"
    try {
        const [hasil] = await db.query(sql)
        console.log(`models labModel say: Berhasil mengambil data laboratorium (${hasil.length} baris)`);
        return hasil
    } catch (error) {
        console.error("models labModel say error: " + error)
        throw error
    }
}

export async function getLabUsagePercentage(totalOperasional = 680, totalPekan = 16, filterJenis = ['tisimat', 'matisi'], onlyAuto = true) {
    let whereClause = ""
    const queryParams = []

    if (filterJenis && filterJenis.length > 0) {
        const conditions = filterJenis.map(() => "LOWER(l.jenis_lab) LIKE ?").join(" OR ")
        whereClause = `WHERE (${conditions})`
        filterJenis.forEach(j => queryParams.push(`%${j.toLowerCase()}%`))
    }

    const autoCondition = onlyAuto ? "AND s.is_auto = 1" : ""

    const sql = `
        SELECT 
            l.id_lab,
            l.nama_lab,
            l.kapasitas,
            l.jenis_lab,
            COALESCE(SUM(TIME_TO_SEC(TIMEDIFF(s.jamselesai, s.jammulai)) / 3600), 0) AS jam_per_minggu,
            COUNT(DISTINCT s.id) AS total_jadwal
        FROM laboratorium l
        LEFT JOIN schadule s ON l.id_lab = s.lab_id 
            ${autoCondition}
            AND EXISTS (SELECT 1 FROM logbook lb WHERE lb.schadules = s.id)
        ${whereClause}
        GROUP BY l.id_lab, l.nama_lab, l.kapasitas, l.jenis_lab
    `
    try {
        const [rows] = await db.query(sql, queryParams)
        const hasil = rows.map((lab) => {
            const jamPerMinggu = parseFloat(lab.jam_per_minggu || 0)
            const totalJamSemester = jamPerMinggu * totalPekan
            const persentase = (totalJamSemester / totalOperasional) * 100

            return {
                id_lab: lab.id_lab,
                nama_lab: lab.nama_lab,
                jenis_lab: lab.jenis_lab,
                kapasitas: lab.kapasitas,
                periode: `1 Semester (6 Bulan / ${totalPekan} Pekan)`,
                total_jadwal_terikat_logbook: lab.total_jadwal,
                total_jam_terpakai_semester: parseFloat(totalJamSemester.toFixed(2)),
                waktu_operasional_semester: totalOperasional,
                persentase_semester: parseFloat(persentase.toFixed(2)) + "%",
                persen_penggunaan: parseFloat(persentase.toFixed(2))
            }
        })
        console.log(`models labModel say: Berhasil menghitung persentase penggunaan lab (${hasil.length} lab)`);
        return hasil
    } catch (error) {
        console.error("models labModel say error in getLabUsagePercentage: " + error)
        throw error
    }
}

``
