import { NavBar } from './components/NavBar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  )
}
