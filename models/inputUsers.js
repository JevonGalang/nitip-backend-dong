import db from '../config/conection.js'

async function inputUsers(usersname, password, email) {
    const sql = "INSERT INTO login VALUES ( ? , ? , ? )"
    const resault =  await db.query(sql, [usersname, password, email])
    try{
        return resault
    } catch(error){
        return "models say: " + error
    }
}

export default inputUsers;