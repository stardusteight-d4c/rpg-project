// Explicar este arquivo, linha a linha
import Fastify from "fastify"

const app = Fastify()

app.get("/user", async function handler(request, reply) {
  return { name: "Gabriel Sena", avatar_url: "", id: "alskdslkd" }
})

const start = async () => {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" })
    console.log("🔥 Servidor rodando em http://localhost:3000")
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
