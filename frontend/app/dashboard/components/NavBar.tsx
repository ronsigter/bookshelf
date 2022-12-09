'use client'

import Link from 'next/link'
import { MENUS } from '../constants'

export const NavBar: React.FC = () => {
  return (
    <ul>
      {MENUS.map(({ label, path }) => (
        <li key={label}>
          <Link href={path}>{label}</Link>
        </li>
      ))}
    </ul>
  )
}
