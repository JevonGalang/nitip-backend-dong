import db from "../config/conection.js"

async function getLab() {
    const sql = "SELECT * FROM laboratorium"
    try {
        const [hasil] = await db.query(sql)
        console.log(`models getLab say: Berhasil mengambil data laboratorium (${hasil.length} baris)`);
        return hasil
    } catch (error) {
        console.error("models getLab say error: " + error)
        throw error
    }
}

export default getLab
