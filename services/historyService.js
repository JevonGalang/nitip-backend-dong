import {
    getFilteredHistorySchedules,
    getFilteredHistoryLogbooks,
    getHistorySchedulesConnectedWithLogbook,
    getLatestHistorySchedulesPerSemester,
    getAllSchedulesFromBothTables,
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

export async function fetchHistorySchadule(queryParams = {}, labIds = null) {
    const {
        month, bulan,
        year, tahun,
        semester,
        sort,
        group_by, groupBy,
        lab_id, labId,
        mode,
        only_auto, onlyAuto,
        is_auto, isAuto
    } = queryParams;

    const filters = {
        month: month || bulan,
        year: year || tahun,
        semester: semester,
        sort: sort || 'DESC',
        lab_id: lab_id || labId,
        lab_ids: labIds,
        mode,
        onlyAuto: only_auto || onlyAuto,
        is_auto: is_auto || isAuto
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

export async function fetchHistoryLogbook(queryParams = {}, labIds = null) {
    const {
        month, bulan,
        year, tahun,
        semester,
        sort,
        group_by, groupBy,
        lab_id, labId,
        mode,
        only_auto, onlyAuto,
        is_auto, isAuto
    } = queryParams;

    const filters = {
        month: month || bulan,
        year: year || tahun,
        semester: semester,
        sort: sort || 'DESC',
        lab_id: lab_id || labId,
        lab_ids: labIds,
        mode,
        onlyAuto: only_auto || onlyAuto,
        is_auto: is_auto || isAuto
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

function hitungDurasiMenitBackend(jammulai, jamselesai) {
    if (!jammulai || !jamselesai) return 0;

    const [hMulai, mMulai] = jammulai.toString().split(':').map(val => parseInt(val, 10) || 0);
    const [hSelesai, mSelesai] = jamselesai.toString().split(':').map(val => parseInt(val, 10) || 0);

    const totalMulai = hMulai * 60 + mMulai;
    let totalSelesai = hSelesai * 60 + mSelesai;

    if (totalSelesai < totalMulai) {
        totalSelesai += 24 * 60;
    }

    const selisih = totalSelesai - totalMulai;
    return selisih > 0 ? selisih : 0;
}

export async function calculateHistoryUsageBackendService(queryParams = {}, labIds = null) {
    const {
        month, bulan,
        year, tahun,
        semester,
        sort,
        lab_id, labId,
        pekan,
        jam_per_hari, jamPerHari,
        hari_per_pekan, hariPerPekan,
        mode,
        operasional,
        only_auto, onlyAuto,
        is_auto, isAuto
    } = queryParams;

    const filters = {
        month: month || bulan,
        year: year || tahun,
        semester,
        sort: sort || 'DESC',
        lab_id: lab_id || labId,
        lab_ids: labIds,
        mode,
        onlyAuto: only_auto || onlyAuto,
        is_auto: is_auto || isAuto
    };

    // 1. SQL mengeksekusi query data gabungan (history_schadule + schadule)
    const schedules = await getAllSchedulesFromBothTables(filters);

    // 2. Tentukan parameter perhitungan di Backend
    const modeName = (mode || '').toLowerCase();
    const isSpecialEvent = modeName === 'umptkin' || modeName === 'ujian_um' || modeName === 'event';

    const pekanReguler = pekan !== undefined ? parseFloat(pekan) : 14;
    const jamHarian = jam_per_hari || jamPerHari ? parseFloat(jam_per_hari || jamPerHari) : 8;
    const hariMingguan = hari_per_pekan || hariPerPekan ? parseFloat(hari_per_pekan || hariPerPekan) : 5;

    const calculatedOperasional = jamHarian * hariMingguan * pekanReguler;
    const totalOperasionalJam = operasional ? parseFloat(operasional) : calculatedOperasional;

    // 3. SEPENUHNYA DIHITUNG DI BACKEND (JavaScript)
    let n_menit = 0;
    let totalCmenit = 0;
    const detailJadwal = [];
    const perLabMap = {};

    for (const item of schedules) {
        const durasiMenit = hitungDurasiMenitBackend(item.jammulai, item.jamselesai);
        const durasiJam = parseFloat((durasiMenit / 60).toFixed(2));
        n_menit += durasiMenit;

        const isAutoItem = item.is_auto === 1 || item.is_auto === '1' || item.is_auto === true;
        const itemCmenit = isAutoItem ? durasiMenit * pekanReguler : durasiMenit * 1;
        totalCmenit += itemCmenit;

        const scheduleDetail = {
            id: item.id,
            lab_id: item.lab_id,
            nama_lab: item.nama_lab,
            jenis_lab: item.jenis_lab,
            prodi_kelas: item.prodi_kelas,
            matkul: item.matkul,
            dosen: item.dosen,
            tanggal: item.tanggal,
            jammulai: item.jammulai,
            jamselesai: item.jamselesai,
            durasi_menit: durasiMenit,
            durasi_jam: durasiJam,
            is_auto: item.is_auto ?? 0,
            sumber_tabel: item.sumber_tabel || 'history'
        };
        detailJadwal.push(scheduleDetail);

        // Grouping per lab
        const labKey = item.lab_id || 'unknown';
        if (!perLabMap[labKey]) {
            perLabMap[labKey] = {
                id_lab: item.lab_id,
                nama_lab: item.nama_lab,
                jenis_lab: item.jenis_lab,
                total_jadwal: 0,
                n_menit: 0,
                n_jam: 0,
                c_menit: 0,
                c_jam: 0,
                a_akumulasi_jam: 0,
                persentase: 0,
                persentase_formatted: "0%"
            };
        }
        perLabMap[labKey].total_jadwal += 1;
        perLabMap[labKey].n_menit += durasiMenit;
        perLabMap[labKey].c_menit += itemCmenit;
    }

    const n_jam = parseFloat((n_menit / 60).toFixed(2));
    const c_menit = totalCmenit;
    const c_jam = parseFloat((c_menit / 60).toFixed(2));
    const a_akumulasi_jam = c_jam;

    const persentaseVal = totalOperasionalJam > 0 ? (a_akumulasi_jam / totalOperasionalJam) * 100 : 0;
    const persentaseFormatted = parseFloat(persentaseVal.toFixed(2));

    // Hitung persentase & format untuk per lab
    const detailPerLab = Object.values(perLabMap).map(lab => {
        const labNjam = parseFloat((lab.n_menit / 60).toFixed(2));
        const labCjam = parseFloat((lab.c_menit / 60).toFixed(2));
        const labPersen = totalOperasionalJam > 0 ? (labCjam / totalOperasionalJam) * 100 : 0;
        const labPersenFormatted = parseFloat(labPersen.toFixed(2));

        return {
            ...lab,
            n_jam: labNjam,
            c_jam: labCjam,
            a_akumulasi_jam: labCjam,
            persentase: labPersenFormatted,
            persentase_formatted: `${labPersenFormatted}%`
        };
    });

    return {
        ringkasan: {
            total_jadwal: schedules.length,
            n_jam: n_jam,
            n_menit: n_menit,
            pekan: pekanReguler,
            c_menit: c_menit,
            c_jam: c_jam,
            a_akumulasi_jam: a_akumulasi_jam,
            jam_operasional_total: totalOperasionalJam,
            persentase: persentaseFormatted,
            persentase_formatted: `${persentaseFormatted}%`
        },
        parameter: {
            mode: isSpecialEvent ? (modeName || 'event') : 'reguler',
            pekan: pekanReguler,
            jam_per_hari: jamHarian,
            hari_per_pekan: hariMingguan,
            jam_operasional_total: totalOperasionalJam,
            rumus: {
                n: "Sum(jamselesai - jammulai) akumulasi seluruh hari (Senin s/d Jumat) dalam 1 pekan",
                c: "c_reguler (n_reguler * 14 pekan) + c_umptkin (n_umptkin * 1 pekan)",
                a: "c_menit / 60 (Akumulasi total jam 1 semester)",
                jam_operasional: "jam_per_hari (8h) * hari_per_pekan (5d) * pekan (14p) = 560 jam",
                persentase: "(a / jam_operasional_total) * 100%"
            }
        },
        detail_per_lab: detailPerLab,
        detail_jadwal: detailJadwal
    };
}

function getWeekRangeFromDate(dateStr) {
    if (!dateStr) return { mondayStr: '', sundayStr: '' };
    const parts = dateStr.toString().split('T')[0].split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const d = new Date(year, month, day);
    const dayOfWeek = d.getDay();
    const distToMon = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const monday = new Date(year, month, day + distToMon);
    const sunday = new Date(year, month, day + distToMon + 6);

    const formatYMD = (dt) => {
        const y = dt.getFullYear();
        const m = String(dt.getMonth() + 1).padStart(2, '0');
        const dNum = String(dt.getDate()).padStart(2, '0');
        return `${y}-${m}-${dNum}`;
    };

    return {
        mondayStr: formatYMD(monday),
        sundayStr: formatYMD(sunday)
    };
}

export async function fetchLatestHistoryScheduleService(queryParams = {}, labIds = null) {
    const {
        month, bulan,
        year, tahun,
        semester, s,
        sort,
        lab_id, labId,
        pekan,
        jam_per_hari, jamPerHari,
        hari_per_pekan, hariPerPekan,
        mode,
        operasional,
        only_auto, onlyAuto,
        is_auto, isAuto
    } = queryParams;

    const semInput = (semester || s || '').toString().toLowerCase();

    const filters = {
        month: month || bulan,
        year: year || tahun,
        semester: semester || s,
        sort: sort || 'DESC',
        lab_id: lab_id || labId,
        lab_ids: labIds,
        mode,
        onlyAuto: only_auto || onlyAuto,
        is_auto: is_auto || isAuto
    };

    // Mengambil data gabungan 2 tabel (schadule + history_schadule)
    const rawSchedules = await getLatestHistorySchedulesPerSemester(filters);

    const modeName = (mode || '').toLowerCase();
    const isSpecialEvent = modeName === 'umptkin' || modeName === 'ujian_um' || modeName === 'event';

    const pekanReguler = pekan !== undefined ? parseFloat(pekan) : 14;
    const jamHarian = jam_per_hari || jamPerHari ? parseFloat(jam_per_hari || jamPerHari) : 8;
    const hariMingguan = hari_per_pekan || hariPerPekan ? parseFloat(hari_per_pekan || hariPerPekan) : 5;

    const calculatedOperasional = jamHarian * hariMingguan * pekanReguler;
    const totalOperasionalJam = operasional ? parseFloat(operasional) : calculatedOperasional;

    const allSemesterData = {
        "Semester 1 (Ganjil)": {
            keterangan: "Bulan Agustus - Januari",
            total_jadwal_terbaru: 0,
            ringkasan_perhitungan: {},
            per_lab: {}
        },
        "Semester 2 (Genap)": {
            keterangan: "Bulan Februari - Juli",
            total_jadwal_terbaru: 0,
            ringkasan_perhitungan: {},
            per_lab: {}
        }
    };

    // Langkah 1: Cari tanggal terbaru dari TABEL AKTIF ('aktif') khusus untuk KELAS REGULER (is_auto=1) per lab per semester.
    // Hal ini agar rentang pekan terbaru (mondayStr - sundayStr) yang dijadikan acuan adalah pekan perkuliahan reguler.
    const activeLatestDatePerLabSemester = {}; 
    const latestDatePerLabSemester = {};

    for (const item of rawSchedules) {
        if (!item.tanggal) continue;
        const isAutoItem = item.is_auto === 1 || item.is_auto === '1' || item.is_auto === true;
        if (!isAutoItem) continue; // Tanggal puncak pekan hanya dihitung dari jadwal reguler

        const d = new Date(item.tanggal);
        const monthNum = d.getMonth() + 1;
        const semesterKey = [8, 9, 10, 11, 12, 1].includes(monthNum)
            ? "Semester 1 (Ganjil)"
            : "Semester 2 (Genap)";

        const labKey = `${semesterKey}_${item.lab_id}`;
        const itemDateStr = typeof item.tanggal === 'string' 
            ? item.tanggal.split('T')[0] 
            : d.toISOString().split('T')[0];

        if (item.sumber_tabel === 'aktif') {
            if (!activeLatestDatePerLabSemester[labKey] || itemDateStr > activeLatestDatePerLabSemester[labKey]) {
                activeLatestDatePerLabSemester[labKey] = itemDateStr;
            }
        }
        if (!latestDatePerLabSemester[labKey] || itemDateStr > latestDatePerLabSemester[labKey]) {
            latestDatePerLabSemester[labKey] = itemDateStr;
        }
    }

    // Hitung rentang pekan (Senin s/d Minggu) untuk tanggal terbaru per lab
    const labWeekRangeMap = {};
    const allLabKeys = new Set([...Object.keys(activeLatestDatePerLabSemester), ...Object.keys(latestDatePerLabSemester)]);
    for (const labKey of allLabKeys) {
        const latestDateStr = activeLatestDatePerLabSemester[labKey] || latestDatePerLabSemester[labKey];
        const range = getWeekRangeFromDate(latestDateStr);
        labWeekRangeMap[labKey] = {
            mondayStr: range.mondayStr,
            sundayStr: range.sundayStr,
            latestDateStr: latestDateStr
        };
    }

    // Langkah 2: Kumpulkan jadwal dalam rentang pekan terbaru tsb dari 2 tabel, lalu DEDUPLIKASI (tanpa ganda!)
    const labSchedulesMap = {}; 

    for (const item of rawSchedules) {
        if (!item.tanggal) continue;
        const d = new Date(item.tanggal);
        const monthNum = d.getMonth() + 1;
        const semesterKey = [8, 9, 10, 11, 12, 1].includes(monthNum)
            ? "Semester 1 (Ganjil)"
            : "Semester 2 (Genap)";

        const labKey = `${semesterKey}_${item.lab_id}`;
        const rangeInfo = labWeekRangeMap[labKey];
        const isAutoItem = item.is_auto === 1 || item.is_auto === '1' || item.is_auto === true;
        if (isAutoItem && !rangeInfo) continue;

        const itemDateStr = typeof item.tanggal === 'string' 
            ? item.tanggal.split('T')[0] 
            : d.toISOString().split('T')[0];
        const isWithinWeekRange = rangeInfo && (itemDateStr >= rangeInfo.mondayStr && itemDateStr <= rangeInfo.sundayStr);

        // Reguler items (is_auto=1): dibatasi ke rentang pekan terbaru (mondayStr - sundayStr)
        // UMPTKIN items (is_auto=0): dimasukkan semua dalam semester tsb
        const shouldInclude = isAutoItem ? isWithinWeekRange : true;

        if (shouldInclude) {
            if (!labSchedulesMap[labKey]) {
                labSchedulesMap[labKey] = {
                    rangeInfo: rangeInfo || { mondayStr: '', sundayStr: '', latestDateStr: itemDateStr },
                    itemsMap: new Map()
                };
            }

            // Kunci unik slot jadwal untuk mencegah DUPLIKASI / GANDA!
            const slotUniqueKey = `${item.lab_id}_${itemDateStr}_${item.jammulai}_${item.jamselesai}_${item.prodi_kelas || ''}_${item.matkul || ''}_${item.is_auto ?? 0}`;
            const map = labSchedulesMap[labKey].itemsMap;

            // Jika slot belum ada, atau jika item saat ini berasal dari 'aktif' (memprioritaskan 'aktif' daripada 'history')
            if (!map.has(slotUniqueKey) || item.sumber_tabel === 'aktif') {
                const durasiMenit = hitungDurasiMenitBackend(item.jammulai, item.jamselesai);
                const durasiJam = parseFloat((durasiMenit / 60).toFixed(2));

                map.set(slotUniqueKey, {
                    id: item.id,
                    lab_id: item.lab_id,
                    nama_lab: item.nama_lab,
                    jenis_lab: item.jenis_lab,
                    prodi_kelas: item.prodi_kelas,
                    matkul: item.matkul,
                    dosen: item.dosen,
                    tanggal: itemDateStr,
                    jammulai: item.jammulai,
                    jamselesai: item.jamselesai,
                    durasi_menit: durasiMenit,
                    durasi_jam: durasiJam,
                    is_auto: item.is_auto ?? 0,
                    sumber_tabel: item.sumber_tabel || 'history'
                });
            }
        }
    }

    // Langkah 3: Olah data ke struktur semesterData
    for (const labKey of Object.keys(labSchedulesMap)) {
        const [semesterKey, labIdStr] = labKey.split('_');
        const { rangeInfo, itemsMap } = labSchedulesMap[labKey];
        const semObj = allSemesterData[semesterKey];
        if (!semObj) continue;

        const deduplicatedItems = Array.from(itemsMap.values());
        // Urutkan jadwal dari Senin s/d Jumat
        deduplicatedItems.sort((a, b) => a.tanggal.localeCompare(b.tanggal) || a.jammulai.localeCompare(b.jammulai));

        let labNmenitReguler = 0;
        let labNmenitUmptkin = 0;
        let labCmenitReguler = 0;
        let labCmenitUmptkin = 0;

        deduplicatedItems.forEach(item => {
            const isAutoItem = item.is_auto === 1 || item.is_auto === '1' || item.is_auto === true;
            if (isAutoItem) {
                labNmenitReguler += item.durasi_menit;
                labCmenitReguler += item.durasi_menit * pekanReguler;
            } else {
                labNmenitUmptkin += item.durasi_menit;
                labCmenitUmptkin += item.durasi_menit * 1;
            }
        });

        const totalNmenit = labNmenitReguler + labNmenitUmptkin;
        const totalCmenit = labCmenitReguler + labCmenitUmptkin;

        const labNjam = parseFloat((totalNmenit / 60).toFixed(2));
        const labCjam = parseFloat((totalCmenit / 60).toFixed(2));
        const labPersen = totalOperasionalJam > 0 ? (labCjam / totalOperasionalJam) * 100 : 0;
        const labPersenFormatted = parseFloat(labPersen.toFixed(2));

        const firstItem = deduplicatedItems[0] || {};
        semObj.per_lab[labIdStr] = {
            id_lab: parseInt(labIdStr, 10) || firstItem.lab_id,
            nama_lab: firstItem.nama_lab || '',
            jenis_lab: firstItem.jenis_lab || '',
            pekan_terbaru: {
                tanggal_mulai_senin: rangeInfo.mondayStr,
                tanggal_selesai_minggu: rangeInfo.sundayStr,
                tanggal_puncak_terbaru: rangeInfo.latestDateStr
            },
            total_jadwal: deduplicatedItems.length,
            rincian_jam: {
                reguler: {
                    n_menit: labNmenitReguler,
                    n_jam: parseFloat((labNmenitReguler / 60).toFixed(2)),
                    c_menit: labCmenitReguler,
                    c_jam: parseFloat((labCmenitReguler / 60).toFixed(2))
                },
                umptkin: {
                    n_menit: labNmenitUmptkin,
                    n_jam: parseFloat((labNmenitUmptkin / 60).toFixed(2)),
                    c_menit: labCmenitUmptkin,
                    c_jam: parseFloat((labCmenitUmptkin / 60).toFixed(2))
                }
            },
            n_menit: totalNmenit,
            n_jam: labNjam,
            c_menit: totalCmenit,
            c_jam: labCjam,
            a_akumulasi_jam: labCjam,
            persentase: labPersenFormatted,
            persentase_formatted: `${labPersenFormatted}%`,
            jadwal_terbaru: deduplicatedItems
        };
        semObj.total_jadwal_terbaru += deduplicatedItems.length;
    }

    // Langkah 4: Hitung ringkasan untuk setiap semester
    for (const semKey of Object.keys(allSemesterData)) {
        const semObj = allSemesterData[semKey];
        const labsArray = Object.values(semObj.per_lab);

        let semNmenitReguler = 0;
        let semNmenitUmptkin = 0;
        let semCmenitReguler = 0;
        let semCmenitUmptkin = 0;

        labsArray.forEach(lab => {
            const rincian = lab.rincian_jam || {};
            semNmenitReguler += rincian.reguler?.n_menit || 0;
            semNmenitUmptkin += rincian.umptkin?.n_menit || 0;
            semCmenitReguler += rincian.reguler?.c_menit || 0;
            semCmenitUmptkin += rincian.umptkin?.c_menit || 0;
        });

        const totalSemNmenit = semNmenitReguler + semNmenitUmptkin;
        const totalSemCmenit = semCmenitReguler + semCmenitUmptkin;

        const semNjam = parseFloat((totalSemNmenit / 60).toFixed(2));
        const semCjam = parseFloat((totalSemCmenit / 60).toFixed(2));
        const semPersen = totalOperasionalJam > 0 ? (semCjam / totalOperasionalJam) * 100 : 0;
        const semPersenFormatted = parseFloat(semPersen.toFixed(2));

        semObj.ringkasan_perhitungan = {
            total_jadwal: labsArray.reduce((acc, l) => acc + (l.total_jadwal || 0), 0),
            rincian_jam: {
                reguler: {
                    n_menit: semNmenitReguler,
                    n_jam: parseFloat((semNmenitReguler / 60).toFixed(2)),
                    c_menit: semCmenitReguler,
                    c_jam: parseFloat((semCmenitReguler / 60).toFixed(2))
                },
                umptkin: {
                    n_menit: semNmenitUmptkin,
                    n_jam: parseFloat((semNmenitUmptkin / 60).toFixed(2)),
                    c_menit: semCmenitUmptkin,
                    c_jam: parseFloat((semCmenitUmptkin / 60).toFixed(2))
                }
            },
            n_jam: semNjam,
            n_menit: totalSemNmenit,
            pekan: pekanReguler,
            c_menit: totalSemCmenit,
            c_jam: semCjam,
            a_akumulasi_jam: semCjam,
            jam_operasional_total: totalOperasionalJam,
            persentase: semPersenFormatted,
            persentase_formatted: `${semPersenFormatted}%`
        };

        semObj.per_lab = labsArray;
    }

    // Langkah 5: Terapkan Filter query param `semester` jika frontend memilih semester tertentu (s1 / s2)
    let filteredResult = allSemesterData;
    if (semInput === '1' || semInput === 'ganjil' || semInput === 's1') {
        filteredResult = {
            "Semester 1 (Ganjil)": allSemesterData["Semester 1 (Ganjil)"]
        };
    } else if (semInput === '2' || semInput === 'genap' || semInput === 's2') {
        filteredResult = {
            "Semester 2 (Genap)": allSemesterData["Semester 2 (Genap)"]
        };
    }

    // Kumpulkan seluruh detail_jadwal secara flat dari filteredResult untuk kemudahan Frontend
    const allFlatSchedules = [];
    for (const semKey of Object.keys(filteredResult)) {
        const semObj = filteredResult[semKey];
        const labsArray = Array.isArray(semObj.per_lab) ? semObj.per_lab : Object.values(semObj.per_lab || {});
        for (const lab of labsArray) {
            if (Array.isArray(lab.jadwal_terbaru)) {
                for (const item of lab.jadwal_terbaru) {
                    allFlatSchedules.push(item);
                }
            }
        }
    }

    // Deduplikasi flat list jika ada item yang muncul di multiple semester/lab key
    const uniqueFlatMap = new Map();
    for (const item of allFlatSchedules) {
        const uniqueKey = `${item.id}_${item.lab_id}_${item.tanggal}_${item.jammulai}_${item.jamselesai}_${item.is_auto}`;
        if (!uniqueFlatMap.has(uniqueKey)) {
            uniqueFlatMap.set(uniqueKey, item);
        }
    }
    const flatDetailJadwal = Array.from(uniqueFlatMap.values());
    flatDetailJadwal.sort((a, b) => a.tanggal.localeCompare(b.tanggal) || a.jammulai.localeCompare(b.jammulai));

    let globalNmenitReguler = 0;
    let globalNmenitUmptkin = 0;
    let globalCmenitReguler = 0;
    let globalCmenitUmptkin = 0;

    flatDetailJadwal.forEach(item => {
        const isAutoItem = item.is_auto === 1 || item.is_auto === '1' || item.is_auto === true;
        if (isAutoItem) {
            globalNmenitReguler += item.durasi_menit;
            globalCmenitReguler += item.durasi_menit * pekanReguler;
        } else {
            globalNmenitUmptkin += item.durasi_menit;
            globalCmenitUmptkin += item.durasi_menit * 1;
        }
    });

    const globalTotalNmenit = globalNmenitReguler + globalNmenitUmptkin;
    const globalTotalCmenit = globalCmenitReguler + globalCmenitUmptkin;

    const globalNjam = parseFloat((globalTotalNmenit / 60).toFixed(2));
    const globalCjam = parseFloat((globalTotalCmenit / 60).toFixed(2));
    const globalPersen = totalOperasionalJam > 0 ? (globalCjam / totalOperasionalJam) * 100 : 0;
    const globalPersenFormatted = parseFloat(globalPersen.toFixed(2));

    return {
        ringkasan_perhitungan: {
            total_jadwal: flatDetailJadwal.length,
            rincian_jam: {
                reguler: {
                    n_menit: globalNmenitReguler,
                    n_jam: parseFloat((globalNmenitReguler / 60).toFixed(2)),
                    c_menit: globalCmenitReguler,
                    c_jam: parseFloat((globalCmenitReguler / 60).toFixed(2))
                },
                umptkin: {
                    n_menit: globalNmenitUmptkin,
                    n_jam: parseFloat((globalNmenitUmptkin / 60).toFixed(2)),
                    c_menit: globalCmenitUmptkin,
                    c_jam: parseFloat((globalCmenitUmptkin / 60).toFixed(2))
                }
            },
            n_jam: globalNjam,
            n_menit: globalTotalNmenit,
            pekan: pekanReguler,
            c_menit: globalTotalCmenit,
            c_jam: globalCjam,
            a_akumulasi_jam: globalCjam,
            jam_operasional_total: totalOperasionalJam,
            persentase: globalPersenFormatted,
            persentase_formatted: `${globalPersenFormatted}%`
        },
        parameter: {
            semester_filter: semInput ? semInput : "semua",
            sumber_tabel: "Gabungan history_schadule + schadule (Deduplicated)",
            mode: isSpecialEvent ? (modeName || 'event') : 'reguler',
            pekan: pekanReguler,
            jam_per_hari: jamHarian,
            hari_per_pekan: hariMingguan,
            jam_operasional_total: totalOperasionalJam,
            rumus: {
                n: "Sum(jamselesai - jammulai) akumulasi seluruh hari (Senin s/d Jumat) dalam 1 pekan tanpa duplikasi",
                c: "c_reguler (n_reguler * 14 pekan) + c_umptkin (n_umptkin * 1 pekan)",
                a: "c_menit / 60 (Akumulasi total jam 1 semester)",
                jam_operasional: "jam_per_hari (8h) * hari_per_pekan (5d) * pekan (14p) = 560 jam",
                persentase: "(a / jam_operasional_total) * 100%"
            }
        },
        data_per_semester: filteredResult,
        detail_jadwal: flatDetailJadwal
    };
}




