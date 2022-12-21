'use client'

import { Button } from 'components/buttons/Button'
import { Input } from 'components/forms/Input'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { registration } from 'services/auth'

type FormType = {
  username: string
  password: string
  passwordConfirm: string
  existingUser?: boolean
}

export const SignUpForm: React.FC = () => {
  const router = useRouter()
  const {
    watch,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm<FormType>()
  const { mutateAsync } = useMutation(registration)

  const onSubmit = async (formdata: FormType) => {
    const { password, username } = formdata
    await mutateAsync({
      password,
      username
    })
      .then(() => {
        router.push('/login')
      })
      .catch(() => {
        setError('existingUser', {
          type: 'server',
          message: 'Username already exists. Please try again.'
        })
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

  const existingUserError = (error?: string): React.ReactNode => {
    if (!error) return null
    return (
      <div className="rounded-lg bg-red-500 px-2 py-3" role="presentation" aria-label="login-error">
        <p className="text-center text-sm text-white">{error}</p>
      </div>
    )
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {existingUserError(errors.existingUser?.message)}
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
          {...register('password', {
            required: 'Password is required.',
            minLength: {
              value: 8,
              message: 'Password is too short (minimum is 8 characters)'
            }
          })}
        />
        {errorFieldMessage(errors.password?.message)}
      </div>
      <div>
        <Input
          label="Confirm password"
          isError={!!errors.password?.message}
          type="password"
          {...register('passwordConfirm', {
            required: 'Password confirmation is required.',
            validate: (val: string) => {
              if (watch('password') != val) {
                return 'Your passwords do no match.'
              }
            }
          })}
        />
        {errorFieldMessage(errors.passwordConfirm?.message)}
      </div>

      <Button isLoading={isSubmitting} onClick={() => clearErrors()} loadingText="Registering...">
        Sign up
      </Button>
    </form>
  )
}
