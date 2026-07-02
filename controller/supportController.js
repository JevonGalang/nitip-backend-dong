import { sendEmailService } from "../services/supportService.js"

const emailController = async (req, res) => {
    const { kopsurat, pengaduannya } = req.body;
    try {
        const hasil = await sendEmailService(kopsurat, pengaduannya);
        res.status(200).json({ message: "email berhasil terkirim", data: hasil });
    } catch (error) {
        res.status(500).json({ message: "gagal mengirim email", error: error.message });
    }
};

export default emailController;
