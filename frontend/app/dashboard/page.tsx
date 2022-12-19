import { unstable_getServerSession } from 'next-auth'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { use } from 'react'
import { listBooks } from 'services/books'
import { FeaturedBooks } from './components/FeaturedBooks'

export default function DashboardPage() {
  const session = use(unstable_getServerSession(authOptions))
  const books = use(listBooks(session))

  return (
    <div className="flex h-screen flex-col px-10">
      <FeaturedBooks books={books} />
    </div>
  )
}
