import db from "../config/conection.js"

async function register(username, password, role) {
    const sql = "INSERT INTO users (id , username , password, role ) VALUES (NULL , ? , ? , ? )"
    try {
        const [hasil] = await db.query(sql,[username, password, role])
        console.log(`models registUsers say: Berhasil mendaftarkan user baru: ${username} (role: ${role})`);
        return hasil; 
    } catch (error) {
        console.error(`models registUsers say error: Gagal mendaftarkan user baru ${username}. Error: ${error}`);
        throw error;
    }
}

export default register;