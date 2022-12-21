import { InProgressState } from 'components/states/InProgressState'

export default function MyListPage() {
  return (
    <div className="flex h-screen flex-col px-10">
      <InProgressState />
    </div>
  )
}
