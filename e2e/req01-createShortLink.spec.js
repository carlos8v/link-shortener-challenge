import { test, expect } from '@playwright/test'
import { bootstrapServer } from '../backend/server'

import { getRandomPort } from './utils'

let started = false
const server = bootstrapServer()
const port = getRandomPort()

test.describe('1 - Criar página inicial com criação de links', () => {
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

    await page.goto('/')
  })

  test.afterAll(async () => {
    await server.close()
  })

  test('Deve ter as tags com os atributos corretos em tela', async ({
    page,
  }) => {
    expect(page.getByTestId('create-shortlink-form')).toBeVisible()

    const slugInput = page.getByTestId('create-shortlink-slug')
    const urlInput = page.getByTestId('create-shortlink-url')
    const button = page.getByTestId('create-shortlink-button')

    await expect(slugInput).toBeVisible()
    await expect(slugInput).toHaveAttribute('type', 'text')
    await expect(slugInput).toHaveAttribute('required', '')

    await expect(urlInput).toBeVisible()
    await expect(urlInput).toHaveAttribute('type', 'url')
    await expect(urlInput).toHaveAttribute('required', '')

    await expect(button).toBeVisible()
    await expect(button).toHaveAttribute('type', 'submit')
    await expect(button).toHaveAttribute('disabled', '')

    await slugInput.type('google')
    await urlInput.type('https://google.com')

    await expect(slugInput).toHaveValue('google')
    await expect(urlInput).toHaveValue('https://google.com')
    await expect(button).not.toHaveAttribute('disabled', '')
  })

  test('Deve ser possível criar um encurtador corretamente', async ({
    page,
  }) => {
    const slugInput = page.getByTestId('create-shortlink-slug')
    const urlInput = page.getByTestId('create-shortlink-url')
    const button = page.getByTestId('create-shortlink-button')

    await slugInput.type('google')
    await urlInput.type('https://google.com')

    await button.click()

    const fetchResponse = page.getByTestId('create-shortlink-response')
    await expect(fetchResponse).toBeVisible()
    await expect(fetchResponse).toHaveText('Encurtador criado com sucesso!')

    await expect(slugInput).toHaveValue('')
    await expect(slugInput).toHaveValue('')
  })

  test('Não deve ser possível criar um encurtador com o slug duplicado', async ({
    page,
  }) => {
    const slugInput = page.getByTestId('create-shortlink-slug')
    const urlInput = page.getByTestId('create-shortlink-url')
    const button = page.getByTestId('create-shortlink-button')

    await slugInput.type('google')
    await urlInput.type('https://google.com')
    await button.click()

    const fetchResponse = page.getByTestId('create-shortlink-response')
    await expect(fetchResponse).toBeVisible()
    await expect(fetchResponse).toHaveText(
      'Encurtador com mesmo slug já cadastrado!'
    )

    await expect(slugInput).toHaveValue('')
    await expect(slugInput).toHaveValue('')
  })
})
