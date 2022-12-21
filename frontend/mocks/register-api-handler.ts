import { rest } from 'msw'
import { db } from './db'

const REST_SERVER = process.env.REST_SERVER || ''

export const registerApiHandler = [
  rest.post(`${REST_SERVER}/api/registration`, async (req, res, ctx) => {
    const { user } = await req.json()
    const userData = db.user.findFirst({
      where: {
        username: {
          equals: user?.username
        }
      }
    })

    if (!userData)
      return res(
        ctx.status(200),
        ctx.json({
          data: { token: 'header.payload.signature', username: user.username }
        })
      )

    return res(
      ctx.status(422),
      ctx.json({
        errors: ['Unprocessable Entity']
      })
    )
  })
]
