import Fastify from "fastify"
import { signIn, signUp } from "./src/routes/auth.ts"

const app = Fastify()

// signUp => salvar usuário localmente, retornar sessão do usuário
// json web tokens
// refreshToken and acessToken
// settar cookies via plugin fastfy/cookies do fastfy
// signIn => mandar username e password, ver se existe um user com aquele username, comparar senha, e criar sessão do usuário
// depois criar classe authRoutes 

// configurar cor
// fazer middleware que recebe acessToken e verifica se está válido
// explicar como extrair informações de obejetos const {name} = user

app.post("/auth/signup", signUp)
app.post("/auth/signin", signIn)

const start = async () => {
  try {
    await app.listen({ port: 3333, host: "0.0.0.0" })
    console.log("🔥 Servidor rodando em http://localhost:3333")
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
