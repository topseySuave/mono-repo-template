import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { createApp } from '../../app'

describe('users', () => {
  it('GET /users returns success structure', async () => {
    const app = createApp()
    const res = await request(app).get('/users')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ success: true, data: [] })
  })

  it('POST /users validates body', async () => {
    const app = createApp()
    const res = await request(app).post('/users').send({ email: 'nope', name: '' })
    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
    expect(res.body.error.code).toBe('BAD_REQUEST')
  })

  it('POST /users creates user', async () => {
    const app = createApp()
    const res = await request(app).post('/users').send({ email: 'a@b.com', name: 'Alice' })
    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data.email).toBe('a@b.com')
  })
})


