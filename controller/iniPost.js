import bcrpyt from "bcrypt";
import connection from "../conection.js";
const say = "iniPost say: "
// export const nyari = (req, res) => {
// const sqlcomand = "SELECT * FROM login WHERE nama = ?";
//   const { username, password } = req.body;
//   const usernya = password;

//   console.log(username);
//   console.log(password);

//   connection.query(sqlcomand, [username], (err, rslt) => {
//     if (rslt.length > 0) {
//       const hasilpas = rslt[0].password;
//       bcrpyt.compare(usernya, hasilpas, (err, lanjut) => {
//         if (!err && lanjut) {
//           return res.status(200).json("bener nich");
//         } else if (err) {
//           return console.log("error nih mas : ", err);
//         } else {
//           return res.status(404).json("tetot");
//         }
//       });
//     } else {
//       res.json("dont known username");
//     }
//     if (err) res.send(err);
//   });
// };

export const nyari =async (req, res) =>{
  const sqlcomand = "SELECT * FROM login WHERE nama = ?";
  const { username, password } = req.body;
  const usernya = password;

  const [db] = await connection.query(sqlcomand, [username]);
  const hasilnya = db
  console.log(hasilnya);


  if(hasilnya == 0){
    return res.json(say + "kosong")
  } else{
    // const hash = await bcrpyt.compare(usernya, hasilnya )
  } 
  // const hash= await bcrpyt.compare()

  
  try{
    res.json("benar")
    console.log(say + "pass dan username yg anda masukan benar");
    
  }
  catch(err){
    console.log(say + "penyebabnya adalah: "+ err);
    
    res.json("salah silahkan kembali lagi")
  }
  
}

export const post = async (req, res) => {
  const { username, password } = req.body;
  const passgweh = password;
  const salt = 10;
  const sql = "INSERT INTO login VALUES ( NULL , ? , ? )";

  const hashing = await bcrpyt.hash(passgweh, salt)
  const sekuel =  await connection.query(sql, [username, hashing])
  try{
    res.status(500).json(sekuel)
  } catch(err){
    console.log(err);
    
  }
}




export const lupapass = async (req, res) => {
  const {username, Newpass} = req.body;
  const sql = "UPDATE login SET password = ?  WHERE username = ?"

 try {
   const akusql = await connection.query(sql, [Newpass, username])
    res.json(akusql)
  } catch
   (err){
  res.json("error nih mas : " + err)
 }
}

/*
rewrite ke async await
*/

