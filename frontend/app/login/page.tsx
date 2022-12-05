import Image from 'next/image'
import { LoginForm } from './components/LoginForm'
import type { NextPage } from 'next'

const LoginPage: NextPage = () => {
  return (
    <div className="bg-background flex h-screen w-full justify-center">
      <div className="flex w-full max-w-sm flex-col items-center justify-center px-4">
        <div className="py-5">
          <Image width={200} height={200} alt="bookney-logo" src="/bookney-light.png" />
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
