import { NavBar } from 'components/navigations/NavBar'
import AuthenthicatorWrapper from 'components/AuthenticatorWrapper'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthenthicatorWrapper>
      <div>
        <NavBar />
        {children}
      </div>
    </AuthenthicatorWrapper>
  )
}
