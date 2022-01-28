const Joker = require('./auth-model')

const checkReqBody = async (req, res, next) => {
    try {
        const user = await Joker.add(req.body)
        console.log(user.username)
        if(!user.username || !user.password) {
            res.status(400).json({ message: "username and password required" })
        } else {next()}
    }
    catch(err) {
        next(err)
    }
}

const checkUsernameExists = async (req, res, next) => {
    try {
        const user = await Joker.findBy({ username: req.body.username})
        if(!user) {
            next({ status: 401, message: "invalid credentials"})
        } else {
            req.user = user
            next()
        }
    } catch (err) {next()}
}

module.exports = {checkReqBody, checkUsernameExists}