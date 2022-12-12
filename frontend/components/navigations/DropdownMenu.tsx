'use client'

import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
import { Button } from 'components/buttons/Button'

export const DropdownMenu: React.FC = () => {
  const router = useRouter()

  const handleOnSignOut = () => {
    deleteCookie('token')
    router.replace('/login')
  }

  return (
    <div className="ml-auto">
      <Button onClick={handleOnSignOut}>Sign out</Button>
    </div>
  )
}
