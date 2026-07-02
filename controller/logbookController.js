import {
    getAllLogbooksService,
    clearAllLogbooksService,
    deleteLogbookService,
    createLogbookService
} from "../services/logbookService.js"
import { getSchedulesWithLabService } from "../services/scheduleService.js"
import { response } from "../helpers/response.js"
import { getIO } from "../config/socket.js"

export const lihatLogbook = async (req, res) => {
    try {
        const hasil = await getAllLogbooksService()
        response(hasil, 200, res)
    } catch (error) {
        res.status(500).json({ error: "error di bagian logbook" })
        console.error(error)
    }
}

export const bersihkanLogbook = async (req, res) => {
    try {
        const hasil = await clearAllLogbooksService()
        response(hasil, 200, res)
        getIO().emit("logbook:update", [])
    } catch (error) {
        res.status(500).json({ error: "error saat menghapus semua logbook" })
        console.error(error)
    }
}

export const hapusLogbookById = async (req, res) => {
    try {
        const hasil = await deleteLogbookService(req)
        response(hasil, 200, res)
        const dataFresh = await getAllLogbooksService()
        getIO().emit("logbook:update", dataFresh)
    } catch (error) {
        res.status(error.message.includes("tidak ditemukan") ? 404 : 500).json({ error: error.message })
        console.error(error)
    }
}

// Digunakan oleh endpoint POST /post/form (Booking Lab)
export const post = async (req, res) => {
    try {
        const hasil = await createLogbookService(req)
        response(hasil, 200, res)
        
        // Broadcast data penggunaan lab terupdate
        const dataFresh = await getSchedulesWithLabService()
        getIO().emit("penggunaanlab:update", dataFresh)
    } catch (error) {
        console.error("Error in booking post:", error)
        res.status(500).json({ error: error.message || "Internal Server Error" })
    }
}

// Digunakan oleh endpoint POST /post/logbook (Pengisian Logbook Presensi)
export const penambahanLog = async (req, res) => {
    try {
        const hasilnya = await createLogbookService(req)
        response(hasilnya, 200, res)
        
        // Broadcast data logbook terupdate
        const dataFresh = await getAllLogbooksService()
        getIO().emit("logbook:update", dataFresh)
    } catch (err) {
        console.error(err)
        return res.status(505).json({
            pesan: "salah nih coba"
        })
    }
}
