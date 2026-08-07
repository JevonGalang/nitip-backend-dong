import { getLabById } from "../models/labModel.js"
import { getScheduleByIdWithCapacity } from "../models/scheduleModel.js"
import { getLogbookByIdWithLab } from "../models/logbookModel.js"

export const roleRbac = ["admin", "yusuf", "ahmad", "ade"]

const aksesLabRole = {
    admin: null,
    yusuf: [9, 11, 12],
    ahmad: [1, 2, 3],
    ade: [13, 14, 18]
}

export function getAksesLabRole(role) {
    if (role === "admin") {
        return null
    }

    return aksesLabRole[role] || []
}

export const aksesLab = (req, res, next) => {
    const labIds = getAksesLabRole(req.user?.role)

    if (req.user?.role !== "admin" && labIds.length === 0) {
        return res.status(403).json({ pesan: "Role tidak memiliki akses laboratorium" })
    }

    req.labIds = labIds
    next()
}

export const hanyaAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ pesan: "Hanya admin yang dapat mengakses endpoint ini" })
    }

    next()
}

function bolehAksesLab(req, idLab) {
    return req.user?.role === "admin" || req.labIds.includes(Number(idLab))
}

export const cekAksesLabBody = async (req, res, next) => {
    const idLab = req.body.lab_id || req.body.labnya

    if (!idLab) {
        return res.status(400).json({ pesan: "ID laboratorium wajib diisi" })
    }

    try {
        const lab = await getLabById(idLab)
        if (!lab) {
            return res.status(404).json({ pesan: "Laboratorium tidak ditemukan" })
        }

        if (!bolehAksesLab(req, lab.id_lab)) {
            return res.status(403).json({ pesan: "Anda tidak memiliki akses ke laboratorium ini" })
        }

        next()
    } catch (error) {
        console.error("rbacMiddleware say error cekAksesLabBody: " + error)
        res.status(500).json({ pesan: "Gagal memeriksa akses laboratorium" })
    }
}

export const cekAksesJadwalParam = async (req, res, next) => {
    try {
        const jadwal = await getScheduleByIdWithCapacity(req.params.id)
        if (!jadwal) {
            return res.status(404).json({ pesan: "Jadwal tidak ditemukan" })
        }

        if (!bolehAksesLab(req, jadwal.lab_id)) {
            return res.status(403).json({ pesan: "Anda tidak memiliki akses ke laboratorium jadwal ini" })
        }

        next()
    } catch (error) {
        console.error("rbacMiddleware say error cekAksesJadwalParam: " + error)
        res.status(500).json({ pesan: "Gagal memeriksa akses jadwal" })
    }
}

export const cekAksesJadwalBody = async (req, res, next) => {
    const idJadwal = req.body.schadule || req.body.schadules || req.body.Terjadwal

    if (!idJadwal) {
        return res.status(400).json({ pesan: "ID jadwal wajib diisi" })
    }

    try {
        const jadwal = await getScheduleByIdWithCapacity(idJadwal)
        if (!jadwal) {
            return res.status(404).json({ pesan: "Jadwal tidak ditemukan" })
        }

        if (!bolehAksesLab(req, jadwal.lab_id)) {
            return res.status(403).json({ pesan: "Anda tidak memiliki akses ke laboratorium jadwal ini" })
        }

        next()
    } catch (error) {
        console.error("rbacMiddleware say error cekAksesJadwalBody: " + error)
        res.status(500).json({ pesan: "Gagal memeriksa akses jadwal" })
    }
}

export const cekAksesLogbookParam = async (req, res, next) => {
    try {
        const logbook = await getLogbookByIdWithLab(req.params.id)
        if (!logbook) {
            return res.status(404).json({ pesan: "Logbook tidak ditemukan" })
        }

        if (!bolehAksesLab(req, logbook.lab_id)) {
            return res.status(403).json({ pesan: "Anda tidak memiliki akses ke laboratorium logbook ini" })
        }

        next()
    } catch (error) {
        console.error("rbacMiddleware say error cekAksesLogbookParam: " + error)
        res.status(500).json({ pesan: "Gagal memeriksa akses logbook" })
    }
}
