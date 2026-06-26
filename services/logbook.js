import logBook from "../models/insertLogbook.js";

export default async function logbook(req) {
     const { schadule , namaKetua, nim , kelas, jumlahPeserta , nomorWa } = req.body;
     
     const front = [schadule , namaKetua, nim , kelas, jumlahPeserta , nomorWa ];   
     
     if(jumlahPeserta > 36) return ({pesan:"jumlah pesertanyanya gak ngotak mas"})

     const hasilnya = await logBook(...front);

     return hasilnya;
}
