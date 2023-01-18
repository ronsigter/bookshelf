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
    // get existing books
    let booksData = db.book.getAll()

    // if no books found, create
    if (booksData.length === 0)
      booksData = Array.from({ length: 5 }).map(() => {
        return db.book.create()
      })

    // sanitize
    const books = booksData.map((book) => ({
      id: book.id,
      type: 'book' as const,
      attributes: book
    }))

    return res(
      ctx.status(200),
      ctx.json({
        data: books,
        meta: {
          pagination: {
            current_page: 1,
            prev_page: null,
            next_page: null,
            total_pages: 1
          }
        }
      })
    )
  })
]
