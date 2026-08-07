import { response } from "../helpers/response.js"
import { emitByLab } from "../config/socket.js"
import {
    fetchHistorySchadule,
    fetchHistoryLogbook,
    addHistorySchadule,
    addHistoryLogbook,
    archiveScheduleService,
    calculateHistoryUsageBackendService,
    fetchLatestHistoryScheduleService
} from "../services/historyService.js"
import { getSchedulesWithLabService } from "../services/scheduleService.js"

export const getHistorySchaduleCtrl = async (req, res) => {
    try {
        const hasil = await fetchHistorySchadule(req.query, req.labIds)
        response(hasil, 200, res)
    } catch (error) {
        console.error("Error in getHistorySchaduleCtrl:", error)
        res.status(500).json({ error: "Terjadi kesalahan pada history schadule" })
    }
}

export const getHistoryLogbookCtrl = async (req, res) => {
    try {
        const hasil = await fetchHistoryLogbook(req.query, req.labIds)
        response(hasil, 200, res)
    } catch (error) {
        console.error("Error in getHistoryLogbookCtrl:", error)
        res.status(500).json({ error: "Terjadi kesalahan pada history logbook" })
    }
}

export const postHistorySchaduleCtrl = async (req, res) => {
    try {
        const hasil = await addHistorySchadule(req)
        response(hasil, 200, res)
        
        // Broadcast update history ke websocket client
        const dataFresh = await fetchHistorySchadule()
        emitByLab("history:schadule:update", dataFresh)
    } catch (error) {
        console.error("Error in postHistorySchaduleCtrl:", error)
        res.status(500).json({ error: "Gagal menyimpan data history schadule" })
    }
}

export const postHistoryLogbookCtrl = async (req, res) => {
    try {
        const hasil = await addHistoryLogbook(req)
        response(hasil, 200, res)

        // Broadcast update history ke websocket client
        const dataFresh = await fetchHistoryLogbook()
        emitByLab("history:logbook:update", dataFresh)
    } catch (error) {
        console.error("Error in postHistoryLogbookCtrl:", error)
        res.status(500).json({ error: "Gagal menyimpan data history logbook" })
    }
}

export const archiveScheduleCtrl = async (req, res) => {
    const { id } = req.params;
    try {
        const hasil = await archiveScheduleService(id)
        response(hasil, 200, res)

        // Broadcast data terupdate ke semua client lewat WebSocket
        const activeFresh = await getSchedulesWithLabService()
        const historySchFresh = await fetchHistorySchadule()
        const historyLogFresh = await fetchHistoryLogbook()

        emitByLab("penggunaanlab:update", activeFresh)
        emitByLab("history:schadule:update", historySchFresh)
        emitByLab("history:logbook:update", historyLogFresh)
    } catch (error) {
        console.error("Error in archiveScheduleCtrl:", error)
        const status = error.message === "Jadwal tidak ditemukan!" ? 404 : 500;
        res.status(status).json({ error: error.message || "Gagal mengarsipkan jadwal" })
    }
}

export const calculateHistoryUsageCtrl = async (req, res) => {
    try {
        const hasil = await fetchLatestHistoryScheduleService(req.query, req.labIds)
        response(hasil, 200, res)
    } catch (error) {
        console.error("Error in calculateHistoryUsageCtrl:", error)
        res.status(500).json({ error: "Terjadi kesalahan saat menghitung persentase history lab" })
    }
}

export const getLatestHistoryScheduleCtrl = async (req, res) => {
    try {
        const hasil = await fetchLatestHistoryScheduleService(req.query, req.labIds)
        response(hasil, 200, res)
    } catch (error) {
        console.error("Error in getLatestHistoryScheduleCtrl:", error)
        res.status(500).json({ error: "Terjadi kesalahan saat mengambil history schedule terbaru" })
    }
}


