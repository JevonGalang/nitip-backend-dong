import db from '../config/conection.js'

async function inputUsers(isi) {
    const sql = "INSERT INTO users (id, nama_ketua_kelas ,number_wa , kegiatan_terjadwal , matkul,dosen_pengampu , jumnlah_peserta , tanggal_kegiatan , jam_masuk , keterangan , created_at ) VALUES ( NULL , ? , ? , ? , ? , ? , ? , ? , ? , ? , NULL )"
    const hasil = await  db.query(sql, isi)
    return "he said" + hasil
}

export default inputUsers;