import getLogbook from "../models/getLogbook.js"

export default async function spillLogbook() {
    const hasilnya = await getLogbook()
    return hasilnya
}
