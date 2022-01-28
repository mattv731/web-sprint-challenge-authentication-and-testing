const db = require('../../data/dbConfig')

function find(){
    return db('users')
}

function findBy(user) {
    return db('users').where(user).first()
}

async function add(user) {
    const [id] = await db('users').insert(user)
    return findBy(id)
}

module.exports = {
    findBy,
    add,
    find
}