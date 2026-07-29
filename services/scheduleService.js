import {
    getAllSchedules,
    clearAllSchedules,
    deleteScheduleById,
    getSchedulesByLabType,
    createSchedule,
    getSchedulesWithLab,
    checkScheduleOverlap
} from "../models/scheduleModel.js"

export async function getAllSchedulesService() {
    const hasilnya = await getAllSchedules()
    return hasilnya
}

export async function clearAllSchedulesService() {
    const hasilnya = await clearAllSchedules()
    return hasilnya
}

export async function deleteScheduleService(req) {
    const { id } = req.params;
    const hasilnya = await deleteScheduleById(id);

    if (hasilnya.affectedRows === 0){
        throw new Error("data dengan id tersebut tidak ditemukan")
    }

    return hasilnya;
}

export async function getSchedulesByLabTypeService(req) {
    let jenisLab = req.params.jenis_lab || req.params.jenislab || req.params.jadwal;
    
    if (jenisLab) {
        jenisLab = jenisLab.trim().toUpperCase()
        if (jenisLab === "FISIOLOGI") {
            jenisLab = "BIOLOGI"
        }
    }
    
    try {
        const hasilnya = await getSchedulesByLabType(jenisLab)
        return hasilnya;
    } catch (error) {
        console.error("spillbyjenis say: " + error)
        throw error
    }
}

export async function createScheduleService(req) {
    const { labnya, prodinya, matkulnya, dosennya, tanggalnya, jammulainya, jamselesainya, is_auto, isAuto } = req.body
    
    // Pengecekan bentrok jadwal
    const bentrok = await checkScheduleOverlap(labnya, tanggalnya, jammulainya, jamselesainya)
    if (bentrok && bentrok.length > 0) {
        throw new Error("Jadwal bertabrakan dengan kelas lain di laboratorium yang sama pada jam tersebut!")
    }

    const autoFlag = is_auto ?? isAuto
    const isAutoVal = autoFlag === true || autoFlag === 1 || autoFlag === 'true' || autoFlag === '1' ? 1 : 0

    const inputData = await createSchedule(labnya, prodinya, matkulnya, dosennya, tanggalnya, jammulainya, jamselesainya, isAutoVal)
    return inputData;
}

export async function getSchedulesWithLabService() {
    const hasilnya = await getSchedulesWithLab()
    return hasilnya
}
