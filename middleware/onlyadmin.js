function adminonly(req, res, next) {
    if (req.user.role != "admin") {
        return res.send(401).json({
            pesan:"what are you doing"
        })
    }
    next()
}

export default adminonly