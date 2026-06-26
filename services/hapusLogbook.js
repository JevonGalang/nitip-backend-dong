import deleteLogbook from "../models/deleteLogbook.js";

export default async function hapusLogbook(req) {
     const { id } = req.params;
     
     const hasilnya = await deleteLogbook(id);

     if (hasilnya.affectedRows === 0){
         throw new Error("data dengan id tersebut tidak ditemukan")
     }

     return hasilnya;
}
