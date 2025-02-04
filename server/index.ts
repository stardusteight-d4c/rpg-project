import Fastify, { FastifyReply, FastifyRequest } from "fastify"
import { randomUUID } from "node:crypto"
import { compare, hash } from "bcrypt"

const app = Fastify()

// organizar o código
// definir user.d.ts
// jogar função signUp para user.ts e importar aqui

// const users = []
// signUp => salvar usuário localmente, retornar sessão do usuário
// json web tokens
// refreshToken and acessToken
// signIn => mandar username e password, ver se existe um user com aquele username, comparar senha, e criar sessão do usuário
// depois criar classe userRoutes

interface IUser {
  id: string
  name: string
  username: string
  password: string
  email: string
}

async function signUp(
  request: FastifyRequest<{ Body: IUser }>,
  reply: FastifyReply
) {
  const newUser: IUser = {
    id: randomUUID(),
    password: await hash(request.body.password, 10),
    email: request.body.email,
    name: request.body.name,
    username: request.body.username,
  }
  return reply.send(newUser)
}

app.post("/user/signup", signUp)

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
