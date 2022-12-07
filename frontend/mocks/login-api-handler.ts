import { rest } from 'msw'

const REST_SERVER = process.env.REST_SERVER || ''

export const apiLoginHandler = [
  rest.post(`${REST_SERVER}/api/login`, async (req, res, ctx) => {
    const { login } = await req.json()
    if (login?.username === 'valid_user')
      return res(
        ctx.status(200),
        ctx.json({
          data: { token: 'header.payload.signature', username: login.username }
        })
      )

    return res(
      ctx.status(401),
      ctx.json({
        errors: ['Unauthorized']
      })
    )
  })
]
