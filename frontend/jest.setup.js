// Used for __tests__/testing-library.js
import '@testing-library/jest-dom/extend-expect'
import 'whatwg-fetch'
import { server } from './mocks/server'

beforeAll(() => {
  server.listen()
})
afterAll(() => {
  server.close()
})
