import {
    getFilteredHistorySchedules,
    getFilteredHistoryLogbooks,
    createHistorySchedule,
    createHistoryLogbook,
    archiveScheduleTransaction
} from "../models/historyModel.js"

function groupDataByMonth(data) {
    const grouped = {};
    for (const item of data) {
        if (!item.tanggal) continue;
        const d = new Date(item.tanggal);
        const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        if (!grouped[monthKey]) {
            grouped[monthKey] = [];
        }
        grouped[monthKey].push(item);
    }
    return grouped;
}

function groupDataBySemester(data) {
    const grouped = {
        "Semester 1 (Agustus - Januari)": [],
        "Semester 2 (Februari - Agustus)": []
    };
    for (const item of data) {
        if (!item.tanggal) continue;
        const d = new Date(item.tanggal);
        const month = d.getMonth() + 1;
        if ([8, 9, 10, 11, 12, 1].includes(month)) {
            grouped["Semester 1 (Agustus - Januari)"].push(item);
        } else {
            grouped["Semester 2 (Februari - Agustus)"].push(item);
        }
    }
    return grouped;
}

export async function fetchHistorySchadule(queryParams = {}) {
    const {
        month, bulan,
        year, tahun,
        semester,
        sort,
        group_by, groupBy,
        lab_id, labId
    } = queryParams;

    const filters = {
        month: month || bulan,
        year: year || tahun,
        semester: semester,
        sort: sort || 'DESC',
        lab_id: lab_id || labId
    };

    const rawData = await getFilteredHistorySchedules(filters);

    const groupType = group_by || groupBy;
    if (groupType === 'month' || groupType === 'bulan') {
        return {
            total: rawData.length,
            filters,
            grouped_by: 'month',
            data: groupDataByMonth(rawData)
        };
    } else if (groupType === 'semester') {
        return {
            total: rawData.length,
            filters,
            grouped_by: 'semester',
            data: groupDataBySemester(rawData)
        };
    }

    return rawData;
}

export async function fetchHistoryLogbook(queryParams = {}) {
    const {
        month, bulan,
        year, tahun,
        semester,
        sort,
        group_by, groupBy,
        lab_id, labId
    } = queryParams;

    const filters = {
        month: month || bulan,
        year: year || tahun,
        semester: semester,
        sort: sort || 'DESC',
        lab_id: lab_id || labId
    };

    const rawData = await getFilteredHistoryLogbooks(filters);

    const groupType = group_by || groupBy;
    if (groupType === 'month' || groupType === 'bulan') {
        return {
            total: rawData.length,
            filters,
            grouped_by: 'month',
            data: groupDataByMonth(rawData)
        };
    } else if (groupType === 'semester') {
        return {
            total: rawData.length,
            filters,
            grouped_by: 'semester',
            data: groupDataBySemester(rawData)
        };
    }

    return rawData;
}

export async function addHistorySchadule(req) {
    const { 
        lab_id, prodi_kelas, matkul, dosen, tanggal, jammulai, jamselesai, is_auto, isAuto,
        labnya, prodinya, matkulnya, dosennya, tanggalnya, jammulainya, jamselesainya
    } = req.body

    const targetLab = lab_id || labnya
    const targetProdi = prodi_kelas || prodinya
    const targetMatkul = matkul || matkulnya
    const targetDosen = dosen || dosennya
    const targetTanggal = tanggal || tanggalnya
    const targetJamMulai = jammulai || jammulainya
    const targetJamSelesai = jamselesai || jamselesainya
    const autoFlag = is_auto ?? isAuto
    const targetIsAuto = autoFlag === true || autoFlag === 1 || autoFlag === 'true' || autoFlag === '1' ? 1 : 0

    const dataInput = await createHistorySchedule(
        targetLab,
        targetProdi,
        targetMatkul,
        targetDosen,
        targetTanggal,
        targetJamMulai,
        targetJamSelesai,
        targetIsAuto
    )
    return dataInput
}

export async function addHistoryLogbook(req) {
    const {
        schadules, namaMahasiswa, nim, kelas, jumlah_hadir, no_wa,
        schadule, namaKetua, jumlahPeserta, nomorWa,
        schadule_id, schedule_id, scheduleId, schaduleId
    } = req.body

    const targetSchadule = schadules || schadule || schadule_id || schedule_id || scheduleId || schaduleId
    if (!targetSchadule) {
        throw new Error("ID Jadwal History (schadules) wajib diisi dan tidak boleh NULL!")
    }

    const targetNama = namaMahasiswa || namaKetua
    const targetNim = nim
    const targetKelas = kelas
    const targetHadir = jumlah_hadir !== undefined ? jumlah_hadir : jumlahPeserta
    const targetWa = no_wa || nomorWa

    const dataInput = await createHistoryLogbook(
        targetSchadule,
        targetNama,
        targetNim,
        targetKelas,
        targetHadir,
        targetWa
    )
    return dataInput
}

export async function archiveScheduleService(scheduleId) {
    const data = await archiveScheduleTransaction(scheduleId)
    return data
}
