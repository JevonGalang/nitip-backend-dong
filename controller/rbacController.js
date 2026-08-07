import { getLabsByIds } from "../models/labModel.js"
import { findUserById, updateUserRole } from "../models/userModel.js"
import { getAksesLabRole, roleRbac } from "../middleware/rbacMiddleware.js"
import { response } from "../helpers/response.js"

export const lihatAksesSaya = async (req, res) => {
    try {
        const semuaLab = req.user.role === "admin"
        const labIds = getAksesLabRole(req.user.role)
        const labs = semuaLab ? await getLabsByIds(null) : await getLabsByIds(labIds)

        response({
            user: req.user,
            akses_semua_lab: semuaLab,
            labs
        }, 200, res)
    } catch (error) {
        console.error("rbacController say error lihatAksesSaya: " + error)
        res.status(500).json({ pesan: "Gagal mengambil akses user" })
    }
}

export const ubahRoleUser = async (req, res) => {
    const { role } = req.body

    if (!roleRbac.includes(role)) {
        return res.status(400).json({ pesan: "Role harus admin, yusuf, ahmad, atau ade" })
    }

    try {
        const user = await findUserById(req.params.id)
        if (!user) {
            return res.status(404).json({ pesan: "User tidak ditemukan" })
        }

        await updateUserRole(req.params.id, role)
        response({ id: user.id, username: user.username, role }, 200, res)
    } catch (error) {
        console.error("rbacController say error ubahRoleUser: " + error)
        res.status(500).json({ pesan: "Gagal mengubah role user" })
    }
}
