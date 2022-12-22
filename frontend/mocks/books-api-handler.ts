import { rest } from 'msw'
import { db } from './db'

const REST_SERVER = process.env.REST_SERVER || ''

export const createBookApiHandler = [
  rest.post(`${REST_SERVER}/api/v1/books`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: { token: 'header.payload.signature' }
      })
    )
  })
]
