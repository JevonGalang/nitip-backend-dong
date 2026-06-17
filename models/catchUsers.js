import db from '../config/conection.js'
async function catchUsers(){
    const sql = "SELECT * FROM users LEFT JOIN laboratorium ON users.nama_lab = laboratorium.id_lab"
    try{
        const [query] = await db.query(sql)
        return query
    } catch(error){
        console.log("models say: " + error)
        return "models say: " + error
    } finally{
        console.log("SELESAI");
    }
}

export default catchUsers;