'use client'

import { Button } from 'components/buttons/Button'
import { Input } from 'components/forms/Input'

export const LoginForm: React.FC = () => {
  const handleOnSubmit = () => {
    console.log('SUBMITTED!')
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleOnSubmit}>
      <Input label="Username" />
      <Input label="Password" type="password" />
      <Button label="Sign In" />
    </form>
  )
}
