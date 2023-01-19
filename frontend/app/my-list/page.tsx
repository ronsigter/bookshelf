import { unstable_getServerSession } from 'next-auth'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { use } from 'react'
import { listMyBooks } from 'services/my-books'
import { MyBooks } from './components/MyBooks'

export default function MyListPage() {
  const session = use(unstable_getServerSession(authOptions))
  const books = use(listMyBooks(session))

  return (
    <div className="flex h-screen flex-col px-10">
      <MyBooks books={books} />
    </div>
  )
}
