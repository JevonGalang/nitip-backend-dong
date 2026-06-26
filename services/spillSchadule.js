import getSchadule from "../models/getSchadule.js"

export default async function spillSchadule() {
    const hasilnya = await getSchadule()
    return hasilnya
}
