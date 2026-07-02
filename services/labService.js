import { getAllLabs } from "../models/labModel.js"

export async function getAllLabsService() {
    const hasilnya = await getAllLabs()
    return hasilnya
}
