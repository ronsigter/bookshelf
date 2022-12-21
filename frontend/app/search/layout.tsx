import { NavBar } from 'components/navigations/NavBar'
import AuthenthicatorWrapper from 'components/AuthenticatorWrapper'

// ? Issue is that TypeScript doesn't understand async components
// ? adding "/* @ts-expect-error Server Component */" from these recommendations
// ? https://beta.nextjs.org/docs/configuring/typescript#end-to-end-type-safety
// ? https://github.com/vercel/next.js/issues/42292

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    /* @ts-expect-error Server Component */
    <AuthenthicatorWrapper>
      <div>
        <NavBar />
        {children}
      </div>
    </AuthenthicatorWrapper>
  )
}
