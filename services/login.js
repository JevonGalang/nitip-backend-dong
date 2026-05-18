import users from '../models/catchUsers.js'
import {hash} from '../helpers/bycriptHash.js'
export default async function logins(req){
    
    // const sqlcomand = "SELECT * FROM login WHERE nama = ?";
    const { username, password } = req.body;
    // const usernya = password;
    const resaultdb = await users(username);  
    const rehashpass = await hash(password)
    console.log(resaultdb);
    return resaultdb
  
 
    
}