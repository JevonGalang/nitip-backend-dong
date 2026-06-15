import users from '../models/registUsers.js'
import {hash} from '../helpers/bycriptHash.js'
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()

const salt = Number(process.env.SALT) 
export default async function logins(req){

        
        // const sqlcomand = "SELECT * FROM login WHERE nama = ?";
    const { username, password,role } = req.body;
    // const usernya = password;
    const hashpass = await hash(password, salt)
    const resaultdb = await users(username,hashpass, role);  
    console.log(resaultdb);
    return resaultdb
  
 
    
}