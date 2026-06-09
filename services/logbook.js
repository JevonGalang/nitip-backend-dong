import inputUsers from "../models/inputUsers.js";

export default function logbook(req) {
     const {namaKetua, numberWa,kegiatanTerjadwal, matkul, dosenPengampu, jumnlahPeserta, tanggalKegiatan, jamMasuk, keterangan } = req.body;
     
     const [...front] = [namaKetua, numberWa, matkul, dosenPengampu, jumnlahPeserta, tanggalKegiatan, jamMasuk, keterangan]   
     console.log(front);
     const hasilnya = inputUsers(front)

     return hasilnya
}