'use client'

import { Button } from 'components/buttons/Button'
import { Input } from 'components/forms/Input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useLogin from '../hooks/useLogin'

type FormType = {
  username: string
  password: string
}

export const LoginForm: React.FC = () => {
  const router = useRouter()
  const { mutate } = useLogin()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<FormType>()
  const [isError, setIsError] = useState(false)

  const onSubmit = async (formdata: FormType): Promise<void> => {
    setIsError(false)
    mutate(formdata, {
      onSuccess: () => {
        // TODO: Save token data to cookies
        router.push('/')
      },
      onError: () => setIsError(true)
    })
  }

  const errorFieldMessage = (error?: string): React.ReactNode => {
    return (
      !!error && (
        <div className="px-[0.75rem] pt-1" role="presentation" aria-label="error-field-message">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )
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
        <Input label="Username" {...register('username', { required: 'Username is required.' })} />
        {errorFieldMessage(errors.username?.message)}
      </div>
      <div>
        <Input
          label="Password"
          type="password"
          {...register('password', { required: 'Password is required.' })}
        />
        {errorFieldMessage(errors.password?.message)}
      </div>
      <Button isLoading={isSubmitting} loadingText="Authenticating...">
        Sign In
      </Button>
    </form>
  )
}
