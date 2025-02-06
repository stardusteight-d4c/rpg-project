import { randomUUID } from "node:crypto"
import { hash } from "bcrypt"
import { FastifyReply, FastifyRequest } from "fastify"

const users: UserDB[] = []

export async function signUp(
  request: FastifyRequest<{ Body: SignUpDTO }>,
  reply: FastifyReply
) {
  const newUser = {
    id: randomUUID(),
    password: await hash(request.body.password, 10),
    email: request.body.email,
    name: request.body.name,
    username: request.body.username,
  }

  const userEmailFound = users.find((user) => user.email === newUser.email)
  const userUsernameFound = users.find((user) => user.username === newUser.username)

  if (userEmailFound) {
    throw new Error("Email already exists")
  }

  if (userUsernameFound) {
    throw new Error("Username already exists")
  }

  users.push(newUser)
  return reply.send(newUser)
}

export async function signIn(
  request: FastifyRequest<{ Body: SignUpDTO }>,
  reply: FastifyReply
) {
  return reply.send(users)
  // const newUser: SignUpDTO = {
  //   id: randomUUID(),
  //   password: await hash(request.body.password, 10),
  //   email: request.body.email,
  //   name: request.body.name,
  //   username: request.body.username,
  // }
  // users.push(newUser)
  // return reply.send(newUser)
}
