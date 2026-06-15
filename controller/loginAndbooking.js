import logbook from "../services/logbook.js"
import { response } from "../helpers/response.js";
import { input } from "../middleware/checkInput.js";
import logins from "../services/regist.js";
import masukservice from "../services/login.js";
const say = "iniPost say: "



export const post = async (req,res) => {
  try {
    const hasil = await logbook(req);
    response(hasil, 200, res);
  } catch (error) {
    console.error("Error in post:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}

export const register = async (req,res) => {
  try{
    const hasil = await logins(req)
    response(hasil, 200 , res)
  } catch(error){
    console.error("error in:", error)
    res.status(500).json("error lah pokoknya")
  }
}

export const masuk = async (req,res) => {
  try{
    const hasil = await masukservice(req)
    response(hasil, 200 , res)
  } catch(error){
    console.error("error in login:", error)
    res.status(401).json({ error: error.message })
  }
}