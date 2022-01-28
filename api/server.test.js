const dbConfig = require("../data/dbConfig")
const request = require('supertest')
const server = require('./server')

// Write your tests here

// beforeAll(async () => {
//   await dbConfig.migrate.rollback()
//   await dbConfig.migrate.latest()
// })
// beforeEach(async () => {
//   await dbConfig.seed.run()
// })

// afterAll(async () => {
//   await dbConfig.destroy()
// })

test('sanity', () => {
  expect(true).toBe(true)
})

describe('GET /api/jokes', () => {
  let res
  beforeEach(async () => {
    res = await request(server).get('/api/jokes')
  })
  test('returns a status 401', () => {
    expect(res.status).toBe(401)
  })
  test('returns error message', () => {
    expect(res.body.message).toBe('token required')
  })
})

describe('POST /api/auth', () => {
  test('returns a status 404', async () => {
    const response = await request(server).post('/api/auth/register')
    .send({
      username: "abileas",
      password: "asinasfd"
    })
    expect(response.status).toBe(401)
    })
  test('returns an error message', async () => {
    const response = await request(server).post('/api/auth/login')
    .send({
      username: "abileas",
    })
    expect(response.status).toBe(404)
  })
})