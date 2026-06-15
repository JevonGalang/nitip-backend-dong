import db from "../config/conection.js"

async function register(username, password, role) {
    const sql = "INSERT INTO allmahasiswa (id , nama , password , role ) VALUES (NULL , ? , ? , ? )"
    const [hasil] = await db.query(sql,[username, password, role])
    return hasil; 

}

export default register;