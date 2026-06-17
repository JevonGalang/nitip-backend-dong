export default function check(req, res, next) {
  const {namalab , namaKetua, numberWa, Terjadwal, matkul, dosen, jumlahPeserta, tanggalKegiatan, jamMasuk, keterangan } = req.body
  if (!namalab){
    res.json({pesan:"pesan anda ada yang kurang"})
  }
  if (!namaKetua){
    res.json({pesan:"pesan anda ada yang kurang"})
  }
  if (!numberWa){
    res.json({pesan:"pesan anda ada yang kurang"})
  }
  if (!Terjadwal){
    res.json({pesan:"pesan anda ada yang kurang"})
  }
  if (!matkul){
    res.json({pesan:"pesan anda ada yang kurang"})
  }
  if (!dosen){
    res.json({pesan:"pesan anda ada yang kurang"})
  }
  if (!jumlahPeserta){
    res.json({pesan:"pesan anda ada yang kurang"})
  }
  if (!jamMasuk){
    res.json({pesan:"pesan anda ada yang kurang"})
  }
  if (!keterangan){
    res.json({pesan:"pesan anda ada yang kurang"})
  }
  next()
}