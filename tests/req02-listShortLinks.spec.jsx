import { describe, expect, it } from 'vitest'
import { bootstrapServer } from '../backend/server'

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRouter } from './renderWithRouter'
import { getRandomPort } from './utils'

import App from '../src/App'

describe('2 - Criar página de listagem de links encurtados', () => {
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

  it('Deve ter os links de navegação na página', async () => {
    const { history } = renderWithRouter(<App />)

    const listPageLink = screen.getByTestId('list-shortlinks-page')
    expect(listPageLink).toBeInTheDocument()
    expect(listPageLink.tagName).toBe('A')
    expect(listPageLink.innerHTML).toBe('Listagem')
    expect(history.location.pathname).toBe('/')

    await userEvent.click(listPageLink)
    expect(history.location.pathname).toBe('/list')

    const addNewPageLink = await screen.findByTestId('create-shortlink-page')
    expect(addNewPageLink).toBeInTheDocument()
    expect(addNewPageLink.innerHTML).toBe('Criar novo')
    expect(addNewPageLink.tagName).toBe('A')

    await userEvent.click(addNewPageLink)
    expect(history.location.pathname).toBe('/')
  })

  it('Deve montar a tabela de links encurtados corretamente', async () => {
    const { history } = renderWithRouter(<App />, ['/', '/list'])
    expect(history.location.pathname).toBe('/list')

    const table = screen.getByTestId('shortlink-list')
    expect(table).toBeInTheDocument()
    expect(table.tagName).toBe('TABLE')

    const trShortLink = await screen.findByTestId('shortlink-1')
    const tdShortLinkSlug = await screen.findByTestId('shortlink-1-slug')
    const tdShortLinkUrl = await screen.findByTestId('shortlink-1-url')

    expect(trShortLink).toBeInTheDocument()
    expect(trShortLink.tagName).toBe('TR')

    expect(tdShortLinkSlug).toBeInTheDocument()
    expect(tdShortLinkSlug.tagName).toBe('TD')
    expect(tdShortLinkSlug.innerHTML).toBe('link-shortener-challenge')

    expect(tdShortLinkUrl).toBeInTheDocument()
    expect(tdShortLinkUrl.tagName).toBe('TD')
    expect(tdShortLinkUrl.innerHTML).toBe('https://github.com/carlos8v/link-shortener-challenge')
  })

  it('Deve mostar na tabela link recém criado', async () => {
    const { history } = renderWithRouter(<App />)
    expect(history.location.pathname).toBe('/')

    await userEvent.type(screen.getByTestId('create-shortlink-slug'), 'google')
    await userEvent.type(screen.getByTestId('create-shortlink-url'), 'https://google.com')
    await userEvent.click(screen.getByTestId('create-shortlink-button'))

    await userEvent.click(screen.getByTestId('list-shortlinks-page'))
    expect(history.location.pathname).toBe('/list')

    const shortLinks = [
      {
        id: 1,
        slug: 'link-shortener-challenge',
        url: 'https://github.com/carlos8v/link-shortener-challenge'
      },
      {
        id: 2,
        slug: 'google',
        url: 'https://google.com'
      }
    ]

    for (const { id, slug, url } of shortLinks) {
      const trShortLink = await screen.findByTestId(`shortlink-${id}`)
      const tdShortLinkSlug = await screen.findByTestId(`shortlink-${id}-slug`)
      const tdShortLinkUrl = await screen.findByTestId(`shortlink-${id}-url`)

      expect(trShortLink).toBeInTheDocument()
      expect(trShortLink.tagName).toBe('TR')

      expect(tdShortLinkSlug).toBeInTheDocument()
      expect(tdShortLinkSlug.tagName).toBe('TD')
      expect(tdShortLinkSlug.innerHTML).toBe(slug)

      expect(tdShortLinkUrl).toBeInTheDocument()
      expect(tdShortLinkUrl.tagName).toBe('TD')
      expect(tdShortLinkUrl.innerHTML).toBe(url)
    }
  })
})
