import { useMutation } from '@tanstack/react-query'
import { login } from 'services/login'

export default function useLogin() {
  return useMutation(login)
}
