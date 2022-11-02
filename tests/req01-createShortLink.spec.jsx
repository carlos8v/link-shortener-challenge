import { describe, expect, it } from 'vitest'
import { bootstrapServer } from '../backend/server'

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRouter } from './renderWithRouter'

import App from '../src/App'

describe('1 - Criar página inicial com criação de links', () => {
  let server

  beforeAll(async () => {
    server = bootstrapServer()
    server.listen({ port: 5000 })
  })

  afterAll(async () => {
    await server.close()
  })

  it('Deve ter as tags com os atributos corretos em tela', async () => {
    renderWithRouter(<App />)

    expect(screen.getByTestId('create-shortlink-form')).toBeInTheDocument()

    const slugInput = screen.getByTestId('create-shortlink-slug')
    const urlInput = screen.getByTestId('create-shortlink-url')
    const button = screen.getByTestId('create-shortlink-button')

    expect(slugInput).toBeInTheDocument()
    expect(slugInput.tagName).toBe('INPUT')
    expect(slugInput.getAttribute('type')).toBe('text')
    expect(slugInput.hasAttribute('required')).toBeTruthy()

    expect(urlInput).toBeInTheDocument()
    expect(urlInput.tagName).toBe('INPUT')
    expect(urlInput.getAttribute('type')).toBe('url')
    expect(urlInput.hasAttribute('required')).toBeTruthy()

    expect(button).toBeInTheDocument()
    expect(button.tagName).toBe('BUTTON')
    expect(button.getAttribute('type')).toBe('submit')
    expect(button.hasAttribute('disabled')).toBeTruthy()

    await userEvent.type(slugInput, 'google')
    await userEvent.type(urlInput, 'https://google.com')

    expect(slugInput.value).toBe('google')
    expect(urlInput.value).toBe('https://google.com')
    expect(button.hasAttribute('disabled')).toBeFalsy()
  })

  it('Deve ser possível criar um encurtador corretamente', async () => {
    renderWithRouter(<App />)

    const slugInput = screen.getByTestId('create-shortlink-slug')
    const urlInput = screen.getByTestId('create-shortlink-url')
    const button = screen.getByTestId('create-shortlink-button')

    await userEvent.type(slugInput, 'google')
    await userEvent.type(urlInput, 'https://google.com')

    await userEvent.click(button)

    const fetchResponse = await screen.findByTestId('create-shortlink-response')
    expect(fetchResponse).toBeInTheDocument()
    expect(fetchResponse.innerHTML).toBe('Encurtador criado com sucesso!')
  })

  it('Não deve ser possível criar um encurtador com o slug duplicado', async () => {
    renderWithRouter(<App />)

    const slugInput = screen.getByTestId('create-shortlink-slug')
    const urlInput = screen.getByTestId('create-shortlink-url')
    const button = screen.getByTestId('create-shortlink-button')

    await userEvent.type(slugInput, 'google')
    await userEvent.type(urlInput, 'https://google.com')

    await userEvent.click(button)

    const fetchResponse = await screen.findByTestId('create-shortlink-response')
    expect(fetchResponse).toBeInTheDocument()
    expect(fetchResponse.innerHTML).toBe('Encurtador com mesmo slug já cadastrado!')
  })
})
