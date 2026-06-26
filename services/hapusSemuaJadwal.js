import clearSchadule from "../models/clearSchadule.js";

export default async function hapusSemuaJadwal() {
    const hasilnya = await clearSchadule()
    return hasilnya
}
