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
