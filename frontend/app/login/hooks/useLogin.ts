import { useMutation } from '@tanstack/react-query'

type LoginDataType = {
  token: string
  username: string
}

type LoginParamsType = {
  username: string
  password: string
}

type LoginResultType = {
  data?: LoginDataType
  errors?: string[]
}

const login = async (credentials: LoginParamsType): Promise<LoginDataType> => {
  try {
    const response = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: credentials
      })
    })

    if (!response.ok) {
      throw Error(response.statusText)
    }

    const { data, errors }: LoginResultType = await response.json()

    if (data) {
      return data
    } else {
      return Promise.reject(errors)
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export default function useLogin() {
  return useMutation(login)
}
