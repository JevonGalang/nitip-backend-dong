import db from "../config/conection.js"

async function register(username, password) {
    const sql = "INSERT INTO allmahasiswa (id , nama , password ) VALUES (NULL , ? , ? )"
    const [hasil] = await db.query(sql,[username, password])
    return hasil; 

}

export default register;