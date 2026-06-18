export function inputLogin(req,res,next) {
    const {username, password} = req.body
    if (!username || !password){
       return res.json({message:"username/password tidak boleh kosong"})
    }
    
    next()
}