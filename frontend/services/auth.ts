type LoginParamsVars = {
  username: string
  password: string
}

const REST_SERVER = process.env.REST_SERVER || ''

export const login = async (credentials: LoginParamsVars) => {
  const response = await fetch(`${REST_SERVER}/api/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      login: credentials
    })
  })

  // ? React-Query will not treat 4XX as errors
  // ? https://tanstack.com/query/v4/docs/guides/query-functions?from=reactQueryV3&original=https://react-query-v3.tanstack.com/guides/query-functions#handling-and-throwing-errors
  // ? Also, Fetch does not throw errors by default
  if (!response.ok) throw new Error(response.statusText)

  return response.json()
}

type RegistationVars = {
  username: string
  password: string
}

export const registration = async (credentials: RegistationVars) => {
  const response = await fetch(`${REST_SERVER}/api/registration`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: credentials
    })
  })

  if (!response.ok) throw new Error(response.statusText)

  return response.json()
}
