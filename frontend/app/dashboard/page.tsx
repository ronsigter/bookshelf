import { use } from 'react'
import { listBooks } from 'services/books'
import { FeaturedBooks } from './components/FeaturedBooks'

export default function DashboardPage() {
  const books = use(listBooks())

  return (
    <div className="flex h-screen flex-col px-10">
      <FeaturedBooks books={books.items} />
    </div>
  )
}
