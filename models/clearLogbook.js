import db from "../config/conection.js"

async function clearLogbook() {
    const sql = "DELETE FROM logbook"
    try {
        const [hasil] = await db.query(sql)
        console.log(`models clearLogbook say: Berhasil menghapus semua data logbook (${hasil.affectedRows} baris dihapus)`);
        return hasil
    } catch (error) {
        console.error("models clearLogbook say error: " + error)
        throw error
    }
}

export default clearLogbook
