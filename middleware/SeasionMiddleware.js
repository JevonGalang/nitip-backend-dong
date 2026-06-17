
const times = new Date()
const seasion = (req,res, next)=>{
    console.log("seasonMidSay: masuk nih tanggal: " + times)
    next()
}

export default seasion