import { findUserByName, createUser } from "../models/userModel.js"
import { hash, compare } from "../helpers/bycriptHash.js"
import { roleRbac } from "../middleware/rbacMiddleware.js"
import dotenv from "dotenv"

dotenv.config()
const salt = Number(process.env.SALT) || 10

export async function loginService(req) {
    const { username, password } = req.body;
    const resaultdb = await findUserByName(username);  

    if (resaultdb.length === 0){
        throw new Error("username tidak ditemukan")
    }

    const cocok = await compare(password, resaultdb[0].password)

    if (!cocok){
        throw new Error("password salah")
    }

    console.log("login berhasil: " + resaultdb[0].username);
    return resaultdb[0]
}

export async function registerService(req) {
    const { username, password, role } = req.body;

    if (!roleRbac.includes(role)) {
        throw new Error("role harus admin, yusuf, ahmad, atau ade")
    }

    const hashpass = await hash(password, salt)
    const resaultdb = await createUser(username, hashpass, role);  
    console.log("register berhasil untuk: " + username);
    return resaultdb
}
