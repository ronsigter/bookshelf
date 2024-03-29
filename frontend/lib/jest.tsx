import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

import { setupServer } from 'msw/node'
import type { RenderOptions, RenderResult } from '@testing-library/react'
import type { RequestHandler } from 'msw'

type AllTheProvidersProps = {
  children: React.ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 1,
      retry: false
    },
    mutations: {
      retry: false,
      retryDelay: 1
    }
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => {}
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

// ? Function to call for setting up server endpoint
// ? Must be called before "describe" inside tests
export const setupMockServer = (handlers: RequestHandler[]) => {
  const server = setupServer(...handlers)

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
}

// Re-export all of react-testing lib here
export * from '@testing-library/react'
export { customRenderer as render }
export { default as userEvent } from '@testing-library/user-event'
