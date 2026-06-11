const send =(req,res, next) =>{
    const kosong = []
    const maxlegth = 100
    const {username, password} = req.body;
    const say ="req middleware say: "
    kosong.push(username)
    kosong.push(password)

}


export default send