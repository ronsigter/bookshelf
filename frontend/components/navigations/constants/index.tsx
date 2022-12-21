import { FaHome, FaSearch, FaBook } from 'react-icons/fa'

export const MENUS = [
  { label: 'home', path: '/dashboard', icon: <FaHome size={16} /> },
  { label: 'search', path: '/search', icon: <FaSearch size={16} /> },
  { label: 'reading list', path: '/my-list', icon: <FaBook size={16} /> }
]
