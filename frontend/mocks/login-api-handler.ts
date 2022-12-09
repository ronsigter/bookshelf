import { rest } from 'msw'
import { db } from './db'

const REST_SERVER = process.env.REST_SERVER || ''

export const apiLoginHandler = [
  rest.post(`${REST_SERVER}/api/login`, async (req, res, ctx) => {
    const { login } = await req.json()
    const user = db.user.findFirst({
      where: {
        username: {
          equals: login?.username
        },
        password: {
          equals: login?.password
        }
      }
    })

    if (!user)
      return res(
        ctx.status(401),
        ctx.json({
          errors: ['Unauthorized']
        })
      )

    return res(
      ctx.status(200),
      ctx.json({
        data: { token: 'header.payload.signature', username: user.username }
      })
    )
  })
]
