import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, RenderOptions, RenderResult } from '@testing-library/react'

type AllTheProvidersProps = {
  children: React.ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 1,
      retry: 0
    },
    mutations: {
      retry: 0,
      retryDelay: 1
    }
  }
})

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

type RenderOptionsType = Omit<RenderOptions, 'queries'>

const customRenderer = (ui: React.ReactElement, options?: RenderOptionsType): RenderResult => {
  return render(ui, {
    wrapper: (props) => AllTheProviders({ ...props })
  })
}

// Re-export all of react-testing lib here
export * from '@testing-library/react'
export { customRenderer as render }
export { default as userEvent } from '@testing-library/user-event'
