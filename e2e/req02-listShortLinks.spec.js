import { test, expect } from '@playwright/test'
import { bootstrapServer } from '../backend/server'

import { getRandomPort } from './utils'

let started = false
const baseUrl = 'http://127.0.0.1:3000'
const server = bootstrapServer()
const port = getRandomPort()

test.describe('2 - Criar página de listagem de links encurtados', () => {
  test.beforeAll(async () => {
    if (!started) {
      await server.listen({ port })
      started = true
    }
  })

  test.beforeEach(async ({ page }) => {
    page.route(`${process.env.VITE_API_URL}/links`, async (route, request) => {
      const method = request.method()
      if (method === 'POST') {
        const response = await route.fetch({
          url: `http://localhost:${port}/links`,
          method: 'POST',
          postData: request.postData(),
        })
        const jsonResponse = await response.json()

        return route.fulfill({
          status: response.status(),
          json: jsonResponse,
        })
      }

      const response = await route.fetch({
        url: `http://localhost:${port}/links`,
        method: 'GET',
      })
      const jsonResponse = await response.json()

      return route.fulfill({
        status: response.status(),
        json: jsonResponse,
      })
    })

    await page.goto('/')
  })

  test.afterAll(async () => {
    await server.close()
  })

  test('Deve ter os links de navegação na página', async ({ page }) => {
    const listPageLink = page.getByTestId('list-shortlinks-page')
    await expect(listPageLink).toBeVisible()
    await expect(listPageLink).toHaveText('Listagem')
    expect(page.url()).toBe(`${baseUrl}/`)

    await listPageLink.click()
    expect(page.url()).toBe(`${baseUrl}/list`)

    const addNewPageLink = page.getByTestId('create-shortlink-page')
    await expect(addNewPageLink).toBeVisible()
    await expect(addNewPageLink).toHaveText('Criar novo')

    await addNewPageLink.click()
    expect(page.url()).toBe(`${baseUrl}/`)
  })

  test('Deve montar a tabela de links encurtados corretamente', async ({
    page,
  }) => {
    await page.goto('/list')
    expect(page.url()).toBe(`${baseUrl}/list`)

    const table = page.getByTestId('shortlink-list')
    await expect(table).toBeVisible()

    const trShortLink = page.getByTestId('shortlink-1')
    const tdShortLinkSlug = page.getByTestId('shortlink-1-slug')
    const tdShortLinkUrl = page.getByTestId('shortlink-1-url')

    await expect(trShortLink).toBeVisible()
    await expect(tdShortLinkSlug).toBeVisible()
    await expect(tdShortLinkUrl).toBeVisible()

    await expect(tdShortLinkSlug).toHaveText('link-shortener-challenge')
    await expect(tdShortLinkUrl).toHaveText(
      'https://github.com/carlos8v/link-shortener-challenge'
    )
  })

  test('Deve mostar na tabela link recém criado', async ({ page }) => {
    const slugInput = page.getByTestId('create-shortlink-slug')
    const urlInput = page.getByTestId('create-shortlink-url')
    const button = page.getByTestId('create-shortlink-button')

    await slugInput.type('google')
    await urlInput.type('https://google.com')
    await button.click()

    const listPageLink = page.getByTestId('list-shortlinks-page')
    await listPageLink.click()

    expect(page.url()).toBe(`${baseUrl}/list`)

    const table = page.getByTestId('shortlink-list')
    await expect(table).toBeVisible()

    const shortLinks = [
      {
        id: 1,
        slug: 'link-shortener-challenge',
        url: 'https://github.com/carlos8v/link-shortener-challenge',
      },
      {
        id: 2,
        slug: 'google',
        url: 'https://google.com',
      },
    ]

    for (const { id, slug, url } of shortLinks) {
      const trShortLink = page.getByTestId(`shortlink-${id}`)
      const tdShortLinkSlug = page.getByTestId(`shortlink-${id}-slug`)
      const tdShortLinkUrl = page.getByTestId(`shortlink-${id}-url`)

      await expect(trShortLink).toBeVisible()
      await expect(tdShortLinkUrl).toBeVisible()
      await expect(tdShortLinkSlug).toBeVisible()

      await expect(tdShortLinkSlug).toHaveText(slug)
      await expect(tdShortLinkUrl).toHaveText(url)
    }
  })
})
