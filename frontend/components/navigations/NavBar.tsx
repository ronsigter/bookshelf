import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
import { Button } from 'components/buttons/Button'
import { MENUS } from './constants'

export const NavBar: React.FC = () => {
  const router = useRouter()

  const handleOnSignOut = () => {
    deleteCookie('token')
    router.replace('/login')
  }

  return (
    <div className="flex items-center gap-10 py-3 px-10">
      <div className="py-1">
        <Link href="/dashboard">
          <Image width={120} height={20} alt="bookney-logo" src="/bookney-light.png" />
        </Link>
      </div>
      <ul className="flex items-center gap-4">
        {MENUS.map(({ label, path }) => (
          <li key={label} className="inline uppercase text-white">
            <Link href={path}>{label}</Link>
          </li>
        ))}
      </ul>
      <div className="ml-auto">
        <Button onClick={handleOnSignOut}>Sign out</Button>
      </div>
    </div>
  )
}
