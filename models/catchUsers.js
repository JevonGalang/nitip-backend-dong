import db from '../config/conection.js'
async function catchUsers(){
    const sql = "SELECT * FROM users JOIN laboratorium ON users.nama_lab = laboratorium.id_lab"
     const [query] = await db.query(sql)
    try{
        return query
    } catch(error){
        return "models say: " + error
    } finally{
        console.log("SELESAI");
        
    }
}

export default catchUsers;