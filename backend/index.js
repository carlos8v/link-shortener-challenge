import { bootstrapServer } from './server.js'

async function main() {
  const fastify = await bootstrapServer()
  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

main()
