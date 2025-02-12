import { randomUUID } from "node:crypto"
import { hash, compare } from "bcrypt"
import type { FastifyReply, FastifyRequest } from "fastify"

const users: UserDB[] = []

export async function signUp(
  request: FastifyRequest<{ Body: SignUpDTO }>,
  reply: FastifyReply
) {
  if (!request.body) {
    throw new Error("request.body is empty")
  }

  const newUser = {
    id: randomUUID(),
    password: await hash(request.body.password, 10),
    email: request.body.email,
    name: request.body.name,
    username: request.body.username,
  }

  const userEmailFound = users.find((user) => user.email === newUser.email)
  const userUsernameFound = users.find(
    (user) => user.username === newUser.username
  )

  if (userEmailFound) {
    throw new Error("Email already exists")
  }

  if (userUsernameFound) {
    throw new Error("Username already exists")
  }

  users.push(newUser)
  const newUserCopy = { ...newUser }
  delete newUserCopy.password
  return reply.send(newUserCopy)
}

export async function signIn(
  request: FastifyRequest<{ Body: SignInDTO }>,
  reply: FastifyReply
) {
  if (!request.body) {
    throw new Error("request.body is empty")
  }

  const userEmail = request.body.email
  const userPassword = request.body.password

  if (userEmail) {
    const userEmailFound = users.find((user) => user.email === userEmail)

    if (!userEmailFound) {
      throw new Error("Incorrect password or email")
    }

    const isPasswordCorret = await compare(
      userPassword,
      userEmailFound.password
    )

    if (!isPasswordCorret) {
      throw new Error("Incorrect password or email")
    }

    delete userEmailFound.password
    return reply.send(userEmailFound)
  }
}
