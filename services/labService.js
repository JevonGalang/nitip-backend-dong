import { getAllLabs, getLabUsagePercentage } from "../models/labModel.js"

export async function getAllLabsService(labIds) {
    const hasilnya = await getAllLabs(labIds)
    return hasilnya
}

export async function getLabUsagePercentageService(req) {
    const totalOperasional = req.query.operasional ? parseFloat(req.query.operasional) : 680
    const totalPekan = req.query.pekan ? parseInt(req.query.pekan) : 16
    const onlyAuto = req.query.onlyAuto !== 'false' && req.query.onlyAuto !== '0'

    let filterJenis = ['tisimat', 'matisi']
    if (req.query.jenis) {
        filterJenis = req.query.jenis.split(',').map(j => j.trim())
    }

    const hasilnya = await getLabUsagePercentage(totalOperasional, totalPekan, filterJenis, onlyAuto, req.labIds)
    return hasilnya
}

