import db from "../config/conection.js"

async function deleteLogbook(id) {
    const sql = "DELETE FROM logbook WHERE id = ?"
    try {
        const [hasil] = await db.query(sql,[id])
        if (hasil.affectedRows > 0) {
            console.log(`models deleteLogbook say: Berhasil menghapus data dengan id ${id}`);
        } else {
            console.log(`models deleteLogbook say: Percobaan hapus selesai, tapi data dengan id ${id} tidak ditemukan`);
        }
        return hasil;
    } catch (error) {
        console.error(`models deleteLogbook say error: Gagal menghapus data dengan id ${id}. Error: ${error}`);
        throw error;
    }
}

export default deleteLogbook;
