import db from "../config/conection.js"

async function clearSchadule() {
    const sql = "DELETE FROM schadule"
    try {
        const [hasil] = await db.query(sql)
        console.log(`models clearSchadule say: Berhasil menghapus semua data jadwal (${hasil.affectedRows} baris dihapus)`);
        return hasil
    } catch (error) {
        console.error("models clearSchadule say error: " + error)
        throw error
    }
}

export default clearSchadule
