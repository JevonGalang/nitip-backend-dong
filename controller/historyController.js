import { response } from "../helpers/response.js"
import { getIO } from "../config/socket.js"
import {
    fetchHistorySchadule,
    fetchHistoryLogbook,
    addHistorySchadule,
    addHistoryLogbook
} from "../services/historyService.js"

export const getHistorySchaduleCtrl = async (req, res) => {
    try {
        const hasil = await fetchHistorySchadule()
        response(hasil, 200, res)
    } catch (error) {
        console.error("Error in getHistorySchaduleCtrl:", error)
        res.status(500).json({ error: "Terjadi kesalahan pada history schadule" })
    }
}

export const getHistoryLogbookCtrl = async (req, res) => {
    try {
        const hasil = await fetchHistoryLogbook()
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
        getIO().emit("history:schadule:update", dataFresh)
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
        getIO().emit("history:logbook:update", dataFresh)
    } catch (error) {
        console.error("Error in postHistoryLogbookCtrl:", error)
        res.status(500).json({ error: "Gagal menyimpan data history logbook" })
    }
}
