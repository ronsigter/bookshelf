import { Button } from 'components/buttons/Button'
import { Input } from 'components/forms/Input'
import { useForm } from 'react-hook-form'
import useLogin from '../hooks/useLogin'

type FormType = {
  username: string
  password: string
}

export const LoginForm: React.FC = () => {
  const { mutate } = useLogin()
  const { handleSubmit, register } = useForm<FormType>()

  const onSubmit = async (formdata: FormType): Promise<void> => {
    mutate(formdata, {
      onSuccess: (data) => {
        // TODO: Save token to cookies
        console.log('token', data.token)
      },
      // TODO: Show error messages
      onError: (error) => console.log(error)
    })
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Username" {...register('username', { required: true })} />
      <Input label="Password" type="password" {...register('password', { required: true })} />
      {/* TODO: Add loading indicator */}
      <Button label="Sign In" />
    </form>
  )
}
