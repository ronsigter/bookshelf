import '../styles/globals.css'
import ContextProviders from './ContextProviders'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body className="bg-background">
        <ContextProviders>{children}</ContextProviders>
      </body>
    </html>
  )
}
