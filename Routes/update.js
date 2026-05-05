import e from "express";
const app =e.Router()

app.post("/", (req,res)=>{
    const {username, password} = req.body
    console.log(username +" "+ password);
    res.send("hidup mimi")
    
})
export default app