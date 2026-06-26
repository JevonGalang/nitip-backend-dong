import db from '../config/conection.js'

async function inputUsers(isi) {
    const sql = "INSERT INTO users (id, username , password, role ) VALUES (NULL, ? , ?, ? )";
    try {
        const [hasil] = await db.query(sql, isi);
        console.log(`models inputUsers say: Berhasil input user baru ${isi[0]} dengan role ${isi[2]}`);
        return hasil;
    } catch (error) {
        console.error(`models inputUsers say error: Gagal input user baru. Error: ${error}`);
        throw error;
    }
}

export default inputUsers;