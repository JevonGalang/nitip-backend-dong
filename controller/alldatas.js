import spillall from "../services/spillall.js"
import { response } from "../helpers/response.js"
import { generateJwt } from "../helpers/jwtToken.js"
import hapusLog from "../services/hapusLog.js"
import spillLogbook from "../services/spillLogbook.js"
import spillSchadule from "../services/spillSchadule.js"
import hapusSemuaJadwal from "../services/hapusSemuaJadwal.js"
import hapusSemuaLogbook from "../services/hapusSemuaLogbook.js"
import spillLab from "../services/spillLab.js"
import { getIO } from "../config/socket.js"
import hapusLogbook from "../services/hapusLogbook.js"


export const history = async (req,res) =>{
    try {
        const hasil = await spillall()
        response(hasil,  200 , res)
    } catch (error) {
     res.status(500).json("error di bagian alldatas")
     console.log(error) 
    }
}

export const hapus = async (req,res) =>{
    try {
        const hasil = await hapusLog(req)
        response(hasil, 200 , res)
        // Ambil data fresh dari DB lalu broadcast ke semua client
        const dataFresh = await spillall()
        getIO().emit("penggunaanlab:update", dataFresh)
    } catch (error) {
     res.status(error.message.includes("tidak ditemukan") ? 404 : 500).json({ error: error.message })
     console.log(error) 
    }
}

export const lihatLogbook = async (req,res) =>{
    try {
        const hasil = await spillLogbook()
        response(hasil, 200 , res)
    } catch (error) {
     res.status(500).json({ error: "error di bagian logbook" })
     console.log(error) 
    }
}

export const lihatJadwal = async (req,res) =>{
    try {
        const hasil = await spillSchadule()
        response(hasil, 200 , res)
    } catch (error) {
     res.status(500).json({ error: "error di bagian jadwal" })
     console.log(error) 
    }
}

export const bersihkanJadwal = async (req,res) =>{
    try {
        const hasil = await hapusSemuaJadwal()
        response(hasil, 200 , res)
        // Setelah clear, kirim array kosong ke semua client
        getIO().emit("penggunaanlab:update", [])
    } catch (error) {
     res.status(500).json({ error: "error saat menghapus semua jadwal" })
     console.log(error) 
    }
}

export const bersihkanLogbook = async (req,res) =>{
    try {
        const hasil = await hapusSemuaLogbook()
        response(hasil, 200 , res)
        // Setelah clear, kirim array kosong ke semua client
        getIO().emit("logbook:update", [])
    } catch (error) {
     res.status(500).json({ error: "error saat menghapus semua logbook" })
     console.log(error) 
    }
}

export const lihatLab = async (req,res) =>{
    try {
        const hasil = await spillLab()
        response(hasil, 200 , res)
    } catch (error) {
     res.status(500).json({ error: "error di bagian laboratorium" })
     console.log(error) 
    }
}

export const hapusLogbookById = async (req,res) =>{
    try {
        const hasil = await hapusLogbook(req)
        response(hasil, 200 , res)
        // Ambil data fresh dari DB lalu broadcast ke semua client
        const dataFresh = await spillLogbook()
        getIO().emit("logbook:update", dataFresh)
    } catch (error) {
     res.status(error.message.includes("tidak ditemukan") ? 404 : 500).json({ error: error.message })
     console.log(error) 
    }
}