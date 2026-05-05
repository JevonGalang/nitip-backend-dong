

const seasion = (req,res, next)=>{
    console.log("seasonMidSay: masuk nih di " + Date.now())
    next()
}

export default seasion