import { rest } from 'msw'
import { db } from './db'

const REST_SERVER = process.env.REST_SERVER || ''

export const addToReadingListApiHandler = [
  rest.post(`${REST_SERVER}/api/v1/reading_lists`, async (req, res, ctx) => {
    const { reading_list } = await req.json()

    const book = db.book.update({
      where: {
        id: {
          equals: reading_list.book_id
        }
      },
      data: {
        reading_status: 'unread'
      }
    })

    return res(
      ctx.status(200),
      ctx.json({
        data: {
          id: book?.id,
          type: 'book' as const,
          attributes: book
        }
      })
    )
  })
]
