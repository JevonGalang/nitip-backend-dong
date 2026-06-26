import datas from "../models/formInputAdmin.js"

export default async function formAdmin(req) {
    const {labnya , prodinya , matkulnya, dosennya , tanggalnya , jammulainya, jamselesainya} = req.body
    const inputData = await datas(labnya , prodinya , matkulnya, dosennya , tanggalnya , jammulainya, jamselesainya)
    return inputData;
} 