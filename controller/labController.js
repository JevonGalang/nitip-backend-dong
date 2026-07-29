import { getAllLabsService, getLabUsagePercentageService } from "../services/labService.js"
import { response } from "../helpers/response.js"

export const lihatLab = async (req, res) => {
    try {
        const hasil = await getAllLabsService()
        response(hasil, 200, res)
    } catch (error) {
        res.status(500).json({ error: "error di bagian laboratorium" })
        console.error(error)
    }
}

export const persentasePenggunaanLab = async (req, res) => {
    try {
        const hasil = await getLabUsagePercentageService(req)
        response(hasil, 200, res)
    } catch (error) {
        res.status(500).json({ error: "error saat menghitung persentase laboratorium" })
        console.error(error)
    }
}

