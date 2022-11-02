import Fastify from 'fastify'
import cors from '@fastify/cors'

let lastId = 1
let links = [
  {
    id: 1,
    slug: "link-shortener-challenge",
    url: "https://github.com/carlos8v/link-shortener-challenge"
  }
]

async function main() {
  const fastify = Fastify()
  fastify.register(cors, {
    origin: '*',
    methods: ['OPTIONS', 'GET', 'POST', 'DELETE']
  })

  fastify.get('/links', (_req, reply) => reply.send(links))

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
      const shortenedLink = links.find((link) => link.slug === slug)
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
      const shortenedLink = links.find((link) => link.slug === slug)
      if (!shortenedLink) {
        return reply.status(400).send({ message: 'Encurtador não encontrado' })
      }

      links = links.filter((link) => link.id !== shortenedLink.id)

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

      const alreadyExists = links.find((link) => link.slug === slug)
      if (alreadyExists) {
        return reply.status(400).send({ message: 'Encurtador com mesmo slug já cadastrado' })
      }

      const shortenedLink = {
        id: ++lastId,
        slug,
        url
      }

      links.push(shortenedLink)

      return reply.status(201).send(shortenedLink)
    }
  )

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

main()
