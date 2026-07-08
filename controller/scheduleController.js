import {
    getAllSchedulesService,
    clearAllSchedulesService,
    deleteScheduleService,
    getSchedulesByLabTypeService,
    createScheduleService,
    getSchedulesWithLabService
} from "../services/scheduleService.js"
import { response } from "../helpers/response.js"
import { getIO } from "../config/socket.js"

export const lihatJadwal = async (req, res) => {
    try {
        const hasil = await getAllSchedulesService()
        response(hasil, 200, res)
    } catch (error) {
        res.status(500).json({ error: "error di bagian jadwal" })
        console.error(error)
    }
}

export const bersihkanJadwal = async (req, res) => {
    try {
        const hasil = await clearAllSchedulesService()
        response(hasil, 200, res)
        getIO().emit("penggunaanlab:update", [])
    } catch (error) {
        res.status(500).json({ error: "error saat menghapus semua jadwal" })
        console.error(error)
    }
}

export const hapus = async (req, res) => {
    try {
        const hasil = await deleteScheduleService(req)
        response(hasil, 200, res)
        const dataFresh = await getSchedulesWithLabService()
        getIO().emit("penggunaanlab:update", dataFresh)
    } catch (error) {
        res.status(error.message.includes("tidak ditemukan") ? 404 : 500).json({ error: error.message })
        console.error(error)
    }
}

export const getSchaduleByJenisLab = async (req, res) => {
    try {
        const hasilnya = await getSchedulesByLabTypeService(req)
        response(hasilnya, 200, res)
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal server error" })
        console.error(error)
    }
}

export const penambahanJadwal = async (req, res) => {
    try {
        const hasilnya = await createScheduleService(req)
        response(hasilnya, 200, res)
        const dataFresh = await getSchedulesWithLabService()
        getIO().emit("penggunaanlab:update", dataFresh)
    } catch (err) {
        console.error(err)
        const status = err.message.includes("Jadwal bertabrakan") ? 400 : 500;
        return res.status(status).json({
            pesan: err.message || "error bos coba cari apa yang error"
        })
    }
}

// Handler ini dinamai "history" di kode asli, namun tugasnya mengembalikan penggunaan lab aktif
export const history = async (req, res) => {
    try {
        const hasil = await getSchedulesWithLabService()
        response(hasil, 200, res)
    } catch (error) {
        res.status(500).json("error di bagian alldatas")
        console.error(error)
    }
}
