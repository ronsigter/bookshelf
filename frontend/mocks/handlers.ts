import { rest } from 'msw'

export const handlers = [
  rest.post('http://localhost:4000/api/login', async (req, res, ctx) => {
    const { login } = await req.json()
    if (login?.username === 'valid_user')
      return res(
        ctx.status(200),
        ctx.json({
          data: { token: 'header.payload.signature' }
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
