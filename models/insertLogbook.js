import db from "../config/conection.js"

const  logBook =  async(schadule , namaKetua, nim , kelas, jumlahPeserta , nomorWa ) =>{
    const sql = "INSERT INTO logbook (id , schadules, namaMahasiswa , nim , kelas , jumlah_hadir , no_wa  ) values (NULL , ? , ? , ? , ? ,? , ?) "
    try {
        const hasil = await db.query(sql , [schadule , namaKetua, nim , kelas, jumlahPeserta , nomorWa ])
        console.log(`models insertLogbook say: Berhasil menginput logbook untuk mahasiswa ${namaKetua} (NIM: ${nim})`);
        return hasil
    } catch (error) {
        console.error(`models insertLogbook say error: Gagal menginput logbook. Error: ${error}`);
        throw error;
    }
}

export default logBook
