import Fastify from 'fastify'
import cors from '@fastify/cors'

const defaultShortLinks = [
  {
    id: 1,
    slug: "link-shortener-challenge",
    url: "https://github.com/carlos8v/link-shortener-challenge"
  }
]

export function bootstrapServer(initialLinks = defaultShortLinks) {
  const shortLinks = [...initialLinks]
  let lastId = shortLinks.length

  const fastify = Fastify({ logger: process.env.NODE_ENV !== 'test' })

  fastify.register(cors, {
    origin: '*',
    methods: ['OPTIONS', 'GET', 'POST', 'DELETE']
  })

  fastify.get('/links', (_req, reply) => reply.send(shortLinks))

  fastify.get(
    '/links/:slug',
    {
      schema: {
        params: {
          type: 'object',
          required: ['slug'],
          properties: {
            slug: { type: 'string' }
          }
        }
      }
    },
    (req, reply) => {
      const { slug } = req.params
      const shortenedLink = shortLinks.find((link) => link.slug === slug)
      if (!shortenedLink) {
        return reply.status(400).send({ message: 'Encurtador não encontrado' })
      }

      return reply.send(shortenedLink)
    }
  )

  fastify.delete(
    '/links/:slug',
    {
      schema: {
        params: {
          type: 'object',
          required: ['slug'],
          properties: {
            slug: { type: 'string' }
          }
        }
      }
    },
    (req, reply) => {
      const { slug } = req.params
      const shortenedLink = shortLinks.find((link) => link.slug === slug)
      if (!shortenedLink) {
        return reply.status(400).send({ message: 'Encurtador não encontrado' })
      }

      const index = shortLinks.indexOf(shortenedLink)
      shortLinks.splice(index, 1)

      return reply.status(204).send()
    }
  )

  fastify.post(
    '/links',
    {
      schema: {
        body: {
          type: 'object',
          required: ['slug', 'url'],
          properties: {
            slug: { type: 'string' },
            url: { type: 'string' }
          }
        }
      }
    },
    (req, reply) => {
      const { slug, url } = req.body

      const alreadyExists = shortLinks.find((link) => link.slug === slug)
      if (alreadyExists) {
        return reply.status(400).send({ message: 'Encurtador com mesmo slug já cadastrado' })
      }

      const shortenedLink = {
        id: ++lastId,
        slug,
        url
      }

      shortLinks.push(shortenedLink)

      return reply.status(201).send(shortenedLink)
    }
  )

  return fastify
}
