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

export async function findUserById(id) {
    const sql = "SELECT id, username, role FROM users WHERE id = ?"
    try {
        const [hasil] = await db.query(sql, [id])
        console.log(`models userModel say: Berhasil mencari user dengan id: ${id}. Ditemukan: ${hasil.length > 0}`);
        return hasil[0] || null
    } catch (error) {
        console.error(`models userModel say error: Gagal mencari user id ${id}. Error: ${error}`);
        throw error
    }
}

export async function createUser(username, password, role) {
    const sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)"
    try {
        const [hasil] = await db.query(sql, [username, password, role])
        console.log(`models userModel say: Berhasil mendaftarkan user baru: ${username} (role: ${role})`);
        return hasil; 
    } catch (error) {
        console.error(`models userModel say error: Gagal mendaftarkan user baru ${username}. Error: ${error}`);
        throw error;
    }
}

export async function updateUserRole(id, role) {
    const sql = "UPDATE users SET role = ? WHERE id = ?"
    try {
        const [hasil] = await db.query(sql, [role, id])
        console.log(`models userModel say: Berhasil mengubah role user id ${id} menjadi ${role}`);
        return hasil
    } catch (error) {
        console.error(`models userModel say error: Gagal mengubah role user id ${id}. Error: ${error}`);
        throw error
    }
}
