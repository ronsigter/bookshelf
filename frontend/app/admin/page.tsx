// TODO: Only admin can access this page

import { CreateBookForm } from './components/CreateBookForm'

export default function AdminPage() {
  return (
    <div className="flex h-screen flex-col px-10">
      <div className="w-full max-w-sm">
        <CreateBookForm />
      </div>
    </div>
  )
}
