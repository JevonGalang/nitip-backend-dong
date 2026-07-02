import {
    getHistorySchedules,
    getHistoryLogbooks,
    createHistorySchedule,
    createHistoryLogbook
} from "../models/historyModel.js"

export async function fetchHistorySchadule() {
    const data = await getHistorySchedules()
    return data
}

export async function fetchHistoryLogbook() {
    const data = await getHistoryLogbooks()
    return data
}

export async function addHistorySchadule(req) {
    const { 
        id, lab_id, prodi_kelas, matkul, dosen, tanggal, jammulai, jamselesai,
        labnya, prodinya, matkulnya, dosennya, tanggalnya, jammulainya, jamselesainya
    } = req.body

    const targetId = id || null
    const targetLab = lab_id || labnya
    const targetProdi = prodi_kelas || prodinya
    const targetMatkul = matkul || matkulnya
    const targetDosen = dosen || dosennya
    const targetTanggal = tanggal || tanggalnya
    const targetJamMulai = jammulai || jammulainya
    const targetJamSelesai = jamselesai || jamselesainya

    const dataInput = await createHistorySchedule(
        targetId,
        targetLab,
        targetProdi,
        targetMatkul,
        targetDosen,
        targetTanggal,
        targetJamMulai,
        targetJamSelesai
    )
    return dataInput
}

export async function addHistoryLogbook(req) {
    const {
        id, schadules, namaMahasiswa, nim, kelas, jumlah_hadir, no_wa,
        schadule, namaKetua, jumlahPeserta, nomorWa
    } = req.body

    const targetId = id || null
    const targetSchadule = schadules || schadule
    const targetNama = namaMahasiswa || namaKetua
    const targetNim = nim
    const targetKelas = kelas
    const targetHadir = jumlah_hadir !== undefined ? jumlah_hadir : jumlahPeserta
    const targetWa = no_wa || nomorWa

    const dataInput = await createHistoryLogbook(
        targetId,
        targetSchadule,
        targetNama,
        targetNim,
        targetKelas,
        targetHadir,
        targetWa
    )
    return dataInput
}
