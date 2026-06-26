import getLab from "../models/getLab.js";

export default async function spillLab() {
    const hasilnya = await getLab()
    return hasilnya
}
