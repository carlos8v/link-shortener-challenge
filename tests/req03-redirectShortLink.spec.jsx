import { describe, expect, it } from 'vitest'
import { bootstrapServer } from '../backend/server'

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRouter } from './renderWithRouter'
import { getRandomPort } from './utils'

import App from '../src/App'
import { act } from 'react-dom/test-utils'

describe('3 - Criar página de redirecionamento de links', () => {
  let server

  const originalEnv = process.env
  const port = getRandomPort()

  beforeAll(async () => {
    server = bootstrapServer()
    await server.listen({ port })
  })

  beforeEach(() => {
    vi.resetModules()
    process.env = {
      ...originalEnv,
      VITE_API_URL: `http://localhost:${port}`
    }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  afterAll(async () => {
    await server.close()
  })

  it('Deve ser possível redirecionar corretament', async () => {
    const { history } = renderWithRouter(<App />)
    expect(history.location.pathname).toBe('/')

    act(() => {
      history.push('/redirect/link-shortener-challenge')
    })

    await expect(screen.findByTestId('shortlink-redirect-info'))
      .resolves
      .toContainHTML('Você está sendo redirecionado para: https://github.com/carlos8v/link-shortener-challenge')

    const redirectAnchor = await screen.findByTestId('shortlink-anchor')
    expect(redirectAnchor).toBeInTheDocument()
    expect(redirectAnchor.tagName).toBe('A')
    expect(redirectAnchor.getAttribute('href')).toBe('https://github.com/carlos8v/link-shortener-challenge')
  })

  it('Não deve ser possível redirecionar link não existente', async () => {
    const { history } = renderWithRouter(<App />)
    expect(history.location.pathname).toBe('/')

    act(() => {
      history.push('/redirect/not-exists')
    })

    const notFound = await screen.findByTestId('shortlink-not-found')
    expect(notFound).toBeInTheDocument()
    expect(notFound.innerHTML).toBe('Slug não encontrado')

    await expect(screen.findByTestId('shortlink-anchor')).rejects.toThrow()
  })

  it('Deve ser possível redirecionar link recém criado', async () => {
    const { history } = renderWithRouter(<App />)
    expect(history.location.pathname).toBe('/')

    await userEvent.type(screen.getByTestId('create-shortlink-slug'), 'google')
    await userEvent.type(screen.getByTestId('create-shortlink-url'), 'https://google.com')
    await userEvent.click(screen.getByTestId('create-shortlink-button'))

    await userEvent.click(screen.getByTestId('list-shortlinks-page'))
    expect(history.location.pathname).toBe('/list')

    act(() => {
      history.push('/redirect/google')
    })

    await expect(screen.findByTestId('shortlink-redirect-info'))
      .resolves
      .toContainHTML('Você está sendo redirecionado para: https://google.com')

    const redirectAnchor = await screen.findByTestId('shortlink-anchor')
    expect(redirectAnchor).toBeInTheDocument()
    expect(redirectAnchor.tagName).toBe('A')
    expect(redirectAnchor.getAttribute('href')).toBe('https://google.com')
  })
})
