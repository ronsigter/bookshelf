'use client'

import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
import { Button } from 'components/buttons/Button'

export default function DashboardPage() {
  const router = useRouter()

  const handleOnSignOut = () => {
    deleteCookie('token')
    router.replace('/login')
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div>Bookney+</div>
      <div>
        <Button onClick={handleOnSignOut}>Sign out</Button>
      </div>
    </div>
  )
}
