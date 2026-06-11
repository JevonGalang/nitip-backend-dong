import inputUsers from "../models/inputUsers.js";

export default async function logbook(req) {
     const {namalab, namaKetua, numberWa, Terjadwal, matkul, dosen, jumlahPeserta, tanggalKegiatan, jamMasuk, keterangan } = req.body;
     
     const front = [namalab, namaKetua, numberWa, Terjadwal, matkul, dosen, jumlahPeserta, tanggalKegiatan, jamMasuk, keterangan];   
     console.log(front);
     const hasilnya = await inputUsers(front);

     return hasilnya;
}