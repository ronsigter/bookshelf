'use client'

import { Button } from 'components/buttons/Button'
import { Input } from 'components/forms/Input'
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'
import { useForm } from 'react-hook-form'
import useLogin from '../hooks/useLogin'

type FormType = {
  username: string
  password: string
}

export const LoginForm: React.FC = () => {
  const router = useRouter()
  const { mutate, isLoading, isError } = useLogin()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<FormType>()

  const onSubmit = (formdata: FormType) => {
    mutate(formdata, {
      onSuccess: ({ data }) => {
        setCookie('token', data.token)
        router.push('/')
      }
    })
  }

  const errorFieldMessage = (error?: string): React.ReactNode => {
    if (!error) return null

    return (
      <div className="px-[0.75rem] pt-1" role="presentation" aria-label="error-field-message">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {isError && (
        <div
          className="rounded-lg bg-red-500 px-2 py-3"
          role="presentation"
          aria-label="login-error"
        >
          <p className="text-center text-sm text-white">
            Sorry, we can&apos;t find an account with this username. Please try again.
          </p>
        </div>
      )}
      <div>
        <Input
          label="Username"
          isError={!!errors.username?.message}
          {...register('username', { required: 'Username is required.' })}
        />
        {errorFieldMessage(errors.username?.message)}
      </div>
      <div>
        <Input
          label="Password"
          isError={!!errors.password?.message}
          type="password"
          {...register('password', { required: 'Password is required.' })}
        />
        {errorFieldMessage(errors.password?.message)}
      </div>
      <Button isLoading={isLoading || isSubmitting} loadingText="Authenticating...">
        Sign In
      </Button>
    </form>
  )
}
