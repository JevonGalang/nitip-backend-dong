import db from '../config/conection.js'

const  datas = async(labnya , prodinya , matkulnya, dosennya , tanggalnya , jammulainya, jamselesainya)=>{
    const sqlcomand = "INSERT INTO schadule (id, lab_id ,  prodi_kelas ,  matkul , dosen , tanggal , jammulai , jamselesai ) VALUES (NULL, ? , ? , ? , ? , ? , ? , ? )"
    try {
        const nambahin = await db.query(sqlcomand , [labnya , prodinya , matkulnya, dosennya , tanggalnya , jammulainya, jamselesainya])
        console.log(`models formInputAdmin say: Berhasil menambahkan jadwal kuliah untuk matkul ${matkulnya}`);
        return nambahin
    } catch (error) {
        console.error(`models formInputAdmin say error: Gagal menambahkan jadwal. Error: ${error}`);
        throw error;
    }
  
}

export default datas