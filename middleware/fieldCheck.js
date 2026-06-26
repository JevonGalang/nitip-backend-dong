  export default function check(req, res, next) {
  const required = ['namalab','namaKetua','numberWa','Terjadwal','matkul','dosen','jumlahPeserta','jamMasuk','keterangan']
  const missing = required.filter(field => !req.body[field] || String(req.body[field]).trim() === '')
  
  if (missing.length > 0){
    return res.status(400).json({
      pesan:"field berikut tidak boleh kosong",
      kurang: missing
    })
  }
  next()
}
