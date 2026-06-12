export function input(req,res,next) {
    const {...lll} = req.body
    console.log(lll)
    next()
}