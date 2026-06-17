import mysql from "mysql2/promise"
import  dotenv from "dotenv"
dotenv.config()

const say ="connection say: "

const pool = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    idleTimeout: 60000,
});

try{
   const conn = await pool.getConnection();
   await conn.ping();
   conn.release();
    console.log(say + "sudah terkoneksi (pool mode)");
    
} catch(err){
    console.log(say + "err: "+ err);
    
}
export default pool;