import mysql from "mysql2/promise"
import  dotenv from "dotenv"
dotenv.config()

const say ="connection say: "

const connection = await mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});

try{
   await connection.ping();
    console.log(say + "sudah terkoneksi");
    
} catch(err){
    console.log(say + "err: "+ err);
    
}
export default connection;