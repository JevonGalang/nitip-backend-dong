import clearLogbook from "../models/clearLogbook.js";

export default async function hapusSemuaLogbook() {
    const hasilnya = await clearLogbook()
    return hasilnya
}
