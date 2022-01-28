const Joker = require('./auth-model')

const checkReqBody = (req, res, next) => {
    if(!req.body.username || !req.body.password || typeof req.body.password !== "string") {
        next({ status: 404, message: "username and password required" })
    } else {next()}
}

const checkUsernameExists = async (req, res, next) => {
    const user = await Joker.findBy({ username: req.body.username})
    if(!user) {
        next({ status: 401, message: "invalid credentials"})
    } else {
        req.user = user
        next()
    }
}

const checkUnique = async (req, res, next) => {
    const user = await Joker.findBy({ username: req.body.username})
    if(user) {
        next({ status: 401, message: "username taken"})
    } else {next()}
}

module.exports = {checkReqBody, checkUsernameExists, checkUnique}