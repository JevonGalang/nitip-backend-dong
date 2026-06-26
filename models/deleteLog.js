import db from "../config/conection.js"

async function deleteLog(id) {
    const sql = "DELETE FROM schadule WHERE id = ?"
    try {
        const [hasil] = await db.query(sql,[id])
        if (hasil.affectedRows > 0) {
            console.log(`models deleteLog say: Berhasil menghapus data dengan id ${id}`);
        } else {
            console.log(`models deleteLog say: Percobaan hapus selesai, tapi data dengan id ${id} tidak ditemukan`);
        }
        return hasil;
    } catch (error) {
        console.error(`models deleteLog say error: Gagal menghapus data dengan id ${id}. Error: ${error}`);
        throw error;
    }
}

export default deleteLog;
