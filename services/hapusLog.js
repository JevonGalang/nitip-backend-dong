import deleteLog from "../models/deleteLog.js";

export default async function hapusLog(req) {
     const { id } = req.params;
     
     const hasilnya = await deleteLog(id);

     if (hasilnya.affectedRows === 0){
         throw new Error("data dengan id tersebut tidak ditemukan")
     }

     return hasilnya;
}
