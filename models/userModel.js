import db from "../config/conection.js"

export async function findUserByName(username) {
    const sql = "SELECT * FROM users WHERE username = ?"
    try {
        const [hasil] = await db.query(sql, [username])
        console.log(`models userModel say: Berhasil mencari user dengan username: ${username}. Ditemukan: ${hasil.length > 0}`);
        return hasil; 
    } catch (error) {
        console.error(`models userModel say error: Gagal mencari user ${username}. Error: ${error}`);
        throw error;
    }
}

export async function createUser(username, password, role) {
    const sql = "INSERT INTO users (id, username, password, role) VALUES (NULL, ?, ?, ?)"
    try {
        const [hasil] = await db.query(sql, [username, password, role])
        console.log(`models userModel say: Berhasil mendaftarkan user baru: ${username} (role: ${role})`);
        return hasil; 
    } catch (error) {
        console.error(`models userModel say error: Gagal mendaftarkan user baru ${username}. Error: ${error}`);
        throw error;
    }
}
