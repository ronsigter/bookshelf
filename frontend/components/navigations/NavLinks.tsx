'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLinks = {
  path: string
  icon: React.ReactNode
  label: string
}

export const NavLinks: React.FC<NavLinks> = ({ path, icon, label }) => {
  const pathname = usePathname()
  const color = pathname === path ? 'text-primary' : 'text-white'

  return (
    <li className={`inline uppercase ${color} hover:text-primary transition-all duration-200`}>
      <Link href={path} className="flex items-center gap-2 text-sm">
        {icon} {label}
      </Link>
    </li>
  )
}
