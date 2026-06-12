const send =(req,res, next) =>{
    const methods = req.method
    const to = req.url
    const times = Date.now()
    const waktu = new Date().getDate()
    const bulan = new Date().getMonth()
    const tahun = new Date().getUTCFullYear()
    const jamber = new Date().getHours()
    const menit =new Date().getMinutes()
    const template = {
        usedMethod:methods,
        usedUrl:to,
        times:{
            date:waktu,
            mounth:bulan,
            years:tahun,
            hour:jamber +":"+ menit
        }
    } 
    console.log(template);
    
    

    next()
    
}


export default send