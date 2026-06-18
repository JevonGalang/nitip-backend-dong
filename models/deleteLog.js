import db from "../config/conection.js"

async function deleteLog(id) {
    const sql = "DELETE FROM users WHERE id = ?"
    const [hasil] = await db.query(sql,[id])
    return hasil; 

}

export default deleteLog;
