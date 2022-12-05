import { Button } from 'components/buttons/Button'
import { Input } from 'components/forms/Input'
import type { NextPage } from 'next'
import Image from 'next/image'

const LoginPage: NextPage = () => {
  return (
    <div className="bg-background flex h-screen w-full justify-center">
      <div className="flex w-full max-w-sm flex-col items-center justify-center px-4">
        <div className="py-5">
          <Image width={200} height={200} alt="bookney-logo" src="/bookney-light.png" />
        </div>
        <form className="flex w-full flex-col gap-4">
          <Input label="Username" />
          <Input label="Password" type="password" />
          <Button label="Sign In" />
        </form>
      </div>
    </div>
  )
}

export default LoginPage
