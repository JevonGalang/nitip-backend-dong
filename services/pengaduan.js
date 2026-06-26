import sayalawan from "../config/mailservice.js"

const pengaduan = async (kopsurat, pengaduannya) =>{
    try {
        const hasil = await sayalawan(kopsurat, pengaduannya)
        console.log("services pengaduan say: Email berhasil dikirim");
        return hasil;
    } catch (error) {
        console.error("services pengaduan say error:", error);
        throw error;
    }
}

export default pengaduan