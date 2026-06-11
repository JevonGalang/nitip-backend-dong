import catchUsers from "../models/catchUsers.js";

export default async function spillall() {
    const hasilnya = await catchUsers()
    return hasilnya
}