import Image from 'next/image'
import Link from 'next/link'
import { LoginForm } from './components/LoginForm'

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full justify-center">
      <div className="flex w-full max-w-sm flex-col items-center justify-center px-4">
        <div className="py-5">
          <Image width={200} height={200} alt="bookney-logo" src="/bookney-light.png" />
        </div>
        <LoginForm />
        <div className="py-4">
          <div className="text-sm text-white">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-sky-400">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
