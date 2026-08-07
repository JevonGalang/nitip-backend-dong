import e from "express";
import validmid from "../middleware/validMiddleware.js";
import { hanyaAdmin } from "../middleware/rbacMiddleware.js";
import { ubahRoleUser } from "../controller/rbacController.js";
const app =e.Router()

app.post("/", (req,res)=>{
    const {username, password} = req.body
    console.log(username +" "+ password);
    res.send("hidup mimi")
    
})
app.patch("/user/:id/role", validmid, hanyaAdmin, ubahRoleUser)
export default app
