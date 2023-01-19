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

export const updateReadingListApiHandler = [
  rest.put(`${REST_SERVER}/api/v1/reading_lists/:reading_list_id`, async (req, res, ctx) => {
    const { reading_list } = await req.json()
    const { reading_list_id } = req.params

    const book = db.book.update({
      where: {
        reading_list_id: {
          equals: reading_list_id as string
        }
      },
      data: {
        reading_status: reading_list.status
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

export const removeFromReadingListApiHandler = [
  rest.delete(`${REST_SERVER}/api/v1/reading_lists/:reading_list_id`, async (req, res, ctx) => {
    const { reading_list_id } = req.params

    db.book.update({
      where: {
        reading_list_id: {
          equals: reading_list_id as string
        }
      },
      data: {
        reading_status: null
      }
    })

    return res(
      ctx.status(200),
      ctx.json({
        data: {
          message: 'Successfully deleted'
        }
      })
    )
  })
]
