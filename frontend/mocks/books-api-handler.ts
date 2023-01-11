import { rest } from 'msw'
import { db } from './db'

const REST_SERVER = process.env.REST_SERVER || ''

export const createBookApiHandler = [
  rest.post(`${REST_SERVER}/api/v1/books`, async (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: { token: 'header.payload.signature' }
      })
    )
  })
]

export const listBooksApiHandler = [
  rest.get(`${REST_SERVER}/api/v1/books`, async (_req, res, ctx) => {
    const books = Array.from({ length: 5 }).map(() => {
      const book = db.book.create()
      return {
        id: book.id,
        type: 'book' as const,
        attributes: book
      }
    })

    return res(
      ctx.status(200),
      ctx.json({
        data: books
      })
    )
  })
]
