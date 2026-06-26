import db from "../config/conection.js"

async function loginUsers(username) {
    const sql = "SELECT * FROM users WHERE username = ?"
    try {
        const [hasil] = await db.query(sql,[username])
        console.log(`models loginUsers say: Berhasil mencari user dengan username: ${username}. Ditemukan: ${hasil.length > 0}`);
        return hasil; 
    } catch (error) {
        console.error(`models loginUsers say error: Gagal mencari user ${username}. Error: ${error}`);
        throw error;
    }
}

export default loginUsers;
