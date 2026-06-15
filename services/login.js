import users from '../models/loginUsers.js'
import {compare} from '../helpers/bycriptHash.js'
export default async function login(req){

    const { username, password } = req.body;
    const resaultdb = await users(username);  

    if (resaultdb.length === 0){
        throw new Error("username tidak ditemukan")
    }

    const cocok = await compare(password, resaultdb[0].password)

    if (!cocok){
        throw new Error("password salah")
    }

    console.log("login berhasil: " + resaultdb[0].nama);
    return resaultdb[0]
  

    
}
