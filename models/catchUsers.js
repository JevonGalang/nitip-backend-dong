import db from '../config/conection.js'
async function catchUsers(){
    const sql = "SELECT * FROM schadule LEFT JOIN laboratorium ON schadule.lab_id = laboratorium.id_lab"
    try{
        const [query] = await db.query(sql)
        console.log("models catchUsers say: Berhasil mengambil data users + lab");
        return query
    } catch(error){
        console.error("models catchUsers say error: " + error)
        return "models say: " + error
    } finally{
        console.log("catchUsers: SELESAI");
    }
}

export default catchUsers;