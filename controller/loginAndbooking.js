import logbook from "../services/logbook.js"
import { response } from "../helpers/response.js";
// import { input } from "../middleware/checkInput.js";
import logins from "../services/regist.js";
import masukservice from "../services/login.js";
import { generateJwt } from "../helpers/jwtToken.js";
import authres from "../helpers/authres.js"
import formAdmin from "../services/formAdmin.js";
import { getIO } from "../config/socket.js"
import spillall from "../services/spillall.js"
import spillLogbook from "../services/spillLogbook.js"

const say = "iniPost say: "



export const post = async (req,res) => {
  
  try {
    const hasil = await logbook(req);
    
    response(hasil,200, res);
    // Ambil data fresh dari DB lalu broadcast ke semua client
    const dataFresh = await spillall()
    getIO().emit("penggunaanlab:update", dataFresh)
  } catch (error) {
    console.error("Error in post:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}

export const register = async (req,res) => {
  
  try{
    const hasil = await logins(req)
    
    response(hasil, 200 , res)
    console.log(hasil);
    
  } 
  catch(error){
    console.error("error in:", error)
    res.status(500).json("error lah pokoknya")
  }
}

export const masuk = async (req,res) => {
  try{
    
    const hasil = await masukservice(req)
    const passnya = hasil.nama
    const idnya = hasil.id
   
    
    const token = generateJwt({
      id:idnya,
   
    })
    
    authres(token, idnya, passnya, 200 , res)
  } catch(error){
    console.error("error in login:", error)
    res.status(401).json({ error: error.message })
  }
}

export async function penambahanJadwal(req,res) {
  try {
    const hasilnya = await formAdmin(req)
    response(hasilnya, 200 , res)
    // Ambil data fresh dari DB lalu broadcast ke semua client
    const dataFresh = await spillall()
    getIO().emit("penggunaanlab:update", dataFresh)
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      pesan:"error bos coba cari apa yang error"
    })
  }
}

export async function penambahanLog(req, res) {
  try {
    const hasilnya =  await logbook(req)
    response(hasilnya , 200 , res)
    // Ambil data fresh dari DB lalu broadcast ke semua client
    const dataFresh = await spillLogbook()
    getIO().emit("logbook:update", dataFresh)
  } catch (err) {
    console.log(err)
    return res.status(505).json({
      pesan:"salah nih coba"
    })
  
  }
}