import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

export const renderWithRouter = (component) => {
  const history = createMemoryHistory()

  return ({
    ...render(
      <QueryClientProvider client={queryClient}>  
        <Router location={history.location} navigator={history}>
          {component}
        </Router>
      </QueryClientProvider>
    ),
    history
  })
}
