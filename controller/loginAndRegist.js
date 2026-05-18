
import bcrpyt from "bcrypt";
import connection from "../config/conection.js";
import logins from '../services/login.js'
import { response } from "../helpers/response.js";
const say = "iniPost say: "

export const nyari =async (req, res) =>{
 
  const hasil = await logins(req)

  try{
    response(hasil, 200, res)
  } catch (error){
    res.json(error).status(404)

  }
}

export const post = async (req, res) => {
  const { username, password } = req.body;
  const passgweh = password;
  const salt = 10;
  const sql = "INSERT INTO login VALUES ( NULL , ? , ? )";

  const hashing = await bcrpyt.hash(passgweh, salt)
  const sekuel =  await connection.query(sql, [username, hashing])
  try{
    res.status(500).json(sekuel)
  } catch(err){
    console.log(err);
    
  }
}




export const lupapass = async (req, res) => {
  const {username, Newpass} = req.body;
  const sql = "UPDATE login SET password = ?  WHERE username = ?"

 try {
   const akusql = await connection.query(sql, [Newpass, username])
    res.json(akusql)
  } catch
   (err){
  res.json("error nih mas : " + err)
 }
}

/*
rewrite ke async await
*/

