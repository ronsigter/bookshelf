'use client'

import { Button } from 'components/buttons/Button'
import { signOut } from 'next-auth/react'

// TODO: Style as a dropdown that contains user profile button and Signout

export const DropdownMenu: React.FC = () => {
  const handleOnSignOut = () => {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <div className="ml-auto">
      <Button onClick={handleOnSignOut}>Sign out</Button>
    </div>
  )
}
