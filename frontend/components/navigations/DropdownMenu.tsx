'use client'

import { useRouter } from 'next/navigation'
import { Button } from 'components/buttons/Button'

export const DropdownMenu: React.FC = () => {
  const router = useRouter()

  const handleOnSignOut = () => {
    router.replace('/login')
  }

  return (
    <div className="ml-auto">
      <Button onClick={handleOnSignOut}>Sign out</Button>
    </div>
  )
}
