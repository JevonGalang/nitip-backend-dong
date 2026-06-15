import db from "../config/conection.js"

async function loginUsers(username) {
    const sql = "SELECT * FROM allmahasiswa WHERE nama = ?"
    const [hasil] = await db.query(sql,[username])
    return hasil; 

}

export default loginUsers;
