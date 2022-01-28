const Joker = require('./auth-model')

const checkReqBody = (req, res, next) => {
        if(!req.body.username || !req.body.password) {
            next({ status: 404, message: "username and password required" })
        } else {next()}
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

const checkUnique = async (req, res, next) => {
    try {
        const user = await Joker.findBy({ username: req.body.username})
        if(user) {
            next({ status: 401, message: "username taken"})
        } else {
            next()
        }
    } catch (err) {next()}
}

module.exports = {checkReqBody, checkUsernameExists, checkUnique}