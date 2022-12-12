/**
 * @jest-environment node
 */

import { middleware } from '../middleware'
import { NextResponse, NextRequest } from 'next/server'

// ? work around as there's an error
// ? https://github.com/vercel/next.js/issues/42374#issuecomment-1304831976
;(Headers.prototype as any).getAll = () => []

describe('Middleware()', () => {
  const redirectSpy = jest.spyOn(NextResponse, 'redirect')
  const nextSpy = jest.spyOn(NextResponse, 'next')

  afterEach(() => {
    redirectSpy.mockReset()
    nextSpy.mockReset()
  })

  it('should redirect to the login page if visiting a protected page with no auth token', async () => {
    const req = new NextRequest(new Request('https://bookney.com/dashboard'))

    await middleware(req)

    expect(redirectSpy).toHaveBeenCalledTimes(1)
    expect(redirectSpy).toHaveBeenCalledWith(new URL('/login', req.url))
  })

  it('should redirect to the dashboar page if credentials are valid', async () => {
    const req = new NextRequest(new Request('https://www.bookney.com/dashboard'))
    req.cookies.set('token', 'bearer payload.token.signature')

    await middleware(req)

    expect(redirectSpy).toHaveBeenCalledTimes(0)
    expect(nextSpy).toHaveBeenCalledTimes(1)
  })
})
