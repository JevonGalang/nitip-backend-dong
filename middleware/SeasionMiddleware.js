
const seasion = (req,res, next)=>{
    const times = new Date()
    console.log("seasonMidSay: masuk nih tanggal: " + times)
    next()
}

export default seasion