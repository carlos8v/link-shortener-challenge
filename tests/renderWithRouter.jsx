import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { render } from '@testing-library/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

export const renderWithRouter = (component, initialEntries = ['/']) => {
  const history = createBrowserHistory()
  for (const path of initialEntries) {
    history.push(path)
  }

  return ({
    ...render(
      <QueryClientProvider client={queryClient}>  
        <HistoryRouter history={history}>
          {component}
        </HistoryRouter>
      </QueryClientProvider>
    ),
    history
  })
}
