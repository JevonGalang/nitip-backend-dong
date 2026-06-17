import spillall from "../services/spillall.js"
import { response } from "../helpers/response.js"
import { generateJwt } from "../helpers/jwtToken.js"

export const history = async (req,res) =>{
    try {
        const hasil = await spillall()
        response(hasil,  200 , res)
    } catch (error) {
     res.status(500).json("error di bagian alldatas")
     console.log(error) 
    }
}