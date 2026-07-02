import mailService from "../config/mailservice.js"

export async function sendEmailService(kopsurat, pengaduannya) {
    try {
        const hasil = await mailService(kopsurat, pengaduannya)
        console.log("services supportService say: Email berhasil dikirim");
        return hasil;
    } catch (error) {
        console.error("services supportService say error:", error);
        throw error;
    }
}
