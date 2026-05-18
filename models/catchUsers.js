import db from '../config/conection.js'
async function catchUsers(user,){
    const sql = "SELECT * FROM login WHERE nama = ? "
     const [query] = await db.query(sql, [user])
    try{
        return query
    } catch(error){
        return "models say: " + error
    } finally{
        console.log("SELESAI");
        
    }q
}

export default catchUsers;