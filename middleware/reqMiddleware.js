const send =(req,res, next) =>{
    const kosong = []
    const maxlegth = 100
    const {username, password} = req.body;
    const say ="req middleware say: "
    kosong.push(username)
    kosong.push(password)

    if(kosong[0].length <= maxlegth && kosong[1].length <= maxlegth) {
        console.log(say + "ada filed nya cuy");
        
        next()
    } else {
        console.log(say + "gak ada filed nya");
        
       return res.status(404).json("kelebihan nih atau kekurangan nih")
       
    }
}


export default send