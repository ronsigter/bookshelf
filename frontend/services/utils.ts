export const headers = (token: string): HeadersInit => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `bearer ${token}`
})
