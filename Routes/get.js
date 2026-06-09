import connection from "../config/conection.js"
import e from "express";
import send from "../middleware/reqMiddleware.js";
const app =e.Router()

app.get("/", async (req,res)=>{

    const [db] = await connection.query("SELECT * FROM users")
    
    try {
        res.json(db)
    } catch (error) {
       res.json("error") 
       console.log("get say: error karena " + error);
       
    }
})

export default app;