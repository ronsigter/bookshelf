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
  const { data, errors }: LoginResultType = await response.json()

  if (response.ok && data) {
    return data
  } else {
    const error = new Error(errors?.map((e) => e).join('\n') ?? 'unknown')
    return Promise.reject(error)
  }
}

export default function useLogin() {
  return useMutation({
    mutationFn: login
  })
}
