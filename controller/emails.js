import pengaduan from "../services/pengaduan.js"
import { response } from "../helpers/response.js"

export default async function (req, res){
    try {
        const { nimataunama , pesannya } = req.body
        const hasil = await pengaduan(nimataunama, pesannya)
        console.log("controller emails say: Berhasil memproses pengaduan");
        return response(hasil, 200 , res)
    } catch (error) {
        console.error("controller emails say error:", error.message);
        return res.status(500).json({ error: error.message || "Gagal mengirim email pengaduan" });
    }
}