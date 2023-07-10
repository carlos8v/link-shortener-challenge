import { test, expect } from '@playwright/test'
import { bootstrapServer } from '../backend/server'

import { getRandomPort } from './utils'

let started = false
const server = bootstrapServer()
const port = getRandomPort()

test.describe('3 - Criar página de redirecionamento de links', async () => {
  test.beforeAll(async () => {
    if (!started) {
      await server.listen({ port })
      started = true
    }
  })

  test.beforeEach(async ({ page }) => {
    page.route(`${process.env.VITE_API_URL}/links`, async (route, request) => {
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
    })

    page.route(
      `${process.env.VITE_API_URL}/links/*`,
      async (route, request) => {
        const id = request.url().split('/').pop()

        const response = await route.fetch({
          url: `http://localhost:${port}/links/${id}`,
          method: 'GET',
        })
        const jsonResponse = await response.json()

        return route.fulfill({
          status: response.status(),
          json: jsonResponse,
        })
      }
    )

    await page.goto('/')
  })

  test.afterAll(async () => {
    await server.close()
  })

  test('Deve ser possível redirecionar corretamente', async ({ page }) => {
    await page.goto('/redirect/link-shortener-challenge')

    const info = page.getByTestId('shortlink-redirect-info')
    await expect(info).toHaveText(
      'Você está sendo redirecionado para: https://github.com/carlos8v/link-shortener-challenge'
    )

    const redirectAnchor = page.getByTestId('shortlink-anchor')
    await expect(redirectAnchor).toBeVisible()
    await expect(redirectAnchor).toHaveAttribute(
      'href',
      'https://github.com/carlos8v/link-shortener-challenge'
    )
  })

  test('Não deve ser possível redirecionar link não existente', async ({
    page,
  }) => {
    await page.goto('/redirect/not-exists')

    const notFound = page.getByTestId('shortlink-not-found')
    await expect(notFound).toBeVisible()
    await expect(notFound).toHaveText('Slug não encontrado')

    await expect(page.getByTestId('shortlink-anchor')).not.toBeVisible()
  })

  test('Deve ser possível redirecionar link recém criado', async ({ page }) => {
    const slugInput = page.getByTestId('create-shortlink-slug')
    const urlInput = page.getByTestId('create-shortlink-url')
    const button = page.getByTestId('create-shortlink-button')

    await slugInput.type('google')
    await urlInput.type('https://google.com')
    await button.click()

    await page.goto('/redirect/google')

    const info = page.getByTestId('shortlink-redirect-info')
    await expect(info).toHaveText(
      'Você está sendo redirecionado para: https://google.com'
    )

    const redirectAnchor = page.getByTestId('shortlink-anchor')
    await expect(redirectAnchor).toBeVisible()
    await expect(redirectAnchor).toHaveAttribute('href', 'https://google.com')
  })
})
