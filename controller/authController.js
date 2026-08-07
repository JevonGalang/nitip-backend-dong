import { loginService, registerService } from "../services/authService.js"
import { generateJwt } from "../helpers/jwtToken.js"
import authres from "../helpers/authres.js"
import { response } from "../helpers/response.js"

export const masuk = async (req, res) => {
    try {
        const hasil = await loginService(req)
        const username = hasil.username
        const idnya = hasil.id
        const role = hasil.role
        
        const token = generateJwt({
            id: idnya,
        })
        
        authres(token, idnya, username, role, 200, res)
    } catch (error) {
        console.error("error in login:", error)
        res.status(401).json({ error: error.message })
    }
}

export const register = async (req, res) => {
    try {
        const hasil = await registerService(req)
        response(hasil, 200, res)
        console.log(hasil);
    } catch (error) {
        console.error("error in register:", error)
        res.status(500).json({ error: error.message || "Gagal melakukan registrasi" })
    }
}
