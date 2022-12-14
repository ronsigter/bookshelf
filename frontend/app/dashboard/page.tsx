import { listBooks } from 'services/books'
import { FeaturedBooks } from './components/FeaturedBooks'

export default async function DashboardPage() {
  const { items } = await listBooks()

  return (
    <div className="flex h-screen flex-col px-10">
      <FeaturedBooks books={items} />
    </div>
  )
}
