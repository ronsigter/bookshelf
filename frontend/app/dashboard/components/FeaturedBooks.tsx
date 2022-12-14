import { listBooks } from 'services/books'

// ? type: any
// ? Asynchronous Server side component type still in the works with TS peeps
// ? https://github.com/vercel/next.js/issues/43537
export const FeaturedBooks: any = async () => {
  const { items } = await listBooks()

  return (
    <div>
      <div>Featured books</div>
      <div className="flex flex-wrap gap-4">
        {items.map(({ id, title }) => (
          <div
            key={id}
            className="border-border relative h-72 w-52 cursor-pointer rounded-2xl border-4 bg-white transition-all duration-300 hover:scale-105"
          >
            <div className="absolute">
              <p>{title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
