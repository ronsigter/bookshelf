'use client'

import { Button } from 'components/buttons/Button'
import { Input } from 'components/forms/Input'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'

type FormType = {
  username: string
  password: string
  userNotFound?: boolean
}

export const LoginForm: React.FC = () => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm<FormType>()

  const onSubmit = async (formdata: FormType) => {
    const data = await signIn('credentials', {
      ...formdata,
      redirect: false
    })
    if (!data?.error) router.push('/dashboard')
    else
      setError('userNotFound', {
        type: 'server',
        message: "Sorry, we can't find an account with this username. Please try again."
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

  const userNotFoundError = (error?: string): React.ReactNode => {
    if (!error) return null
    return (
      <div className="rounded-lg bg-red-500 px-2 py-3" role="presentation" aria-label="login-error">
        <p className="text-center text-sm text-white">{error}</p>
      </div>
    )
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {userNotFoundError(errors.userNotFound?.message)}
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
      <Button
        isLoading={isSubmitting}
        onClick={() => clearErrors()}
        loadingText="Authenticating..."
      >
        Sign In
      </Button>
    </form>
  )
}
