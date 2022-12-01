import { Input } from 'components/forms/Input'
import type { NextPage } from 'next'

const LoginContainer: NextPage = () => {
  return (
    <div className="bg-background flex h-screen w-full justify-center">
      <div className="flex w-full max-w-sm flex-col items-center justify-center px-4">
        <form className="flex w-full flex-col gap-4">
          <Input label="Username" />
          <Input label="Password" type="password" />
        </form>
      </div>
    </div>
  )
}

export default LoginContainer
