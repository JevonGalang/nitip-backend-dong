import db from '../config/conection.js'

async function inputUsers(isi) {
    const sql = "INSERT INTO users (id,nama_lab, nama_ketua_kelas, number_wa, kegiatan_terjadwa, matkul, dosen_pengampu, jumlah_peserta, tanggal_kegiatan, jam_masuk, keterangan) VALUES (NULL , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const [hasil] = await db.query(sql, isi);
    return hasil;
}

export default inputUsers;