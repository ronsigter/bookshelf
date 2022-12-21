import Image from 'next/image'
import Link from 'next/link'
import { MENUS } from './constants'
import { DropdownMenu } from './DropdownMenu'
import { NavLinks } from './NavLinks'

export const NavBar: React.FC = () => {
  return (
    <div className="flex items-center gap-10 py-3 px-10">
      <div className="py-1">
        <Link href="/dashboard">
          <Image width={120} height={20} alt="bookney-logo" src="/bookney-light.png" />
        </Link>
      </div>
      <ul className="flex items-center gap-4">
        {MENUS.map((menu) => (
          <NavLinks key={menu.label} {...menu} />
        ))}
      </ul>
      <DropdownMenu />
    </div>
  )
}
