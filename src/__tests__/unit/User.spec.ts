import { v4 } from "uuid"

import { AppError } from "../../erros/AppError"
import { User } from "../../model/User"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserService } from "../../services/users/CreateUserService"

let createUserService: CreateUserService
let usersRepository: UsersRepositoryInMemory

describe("Create user", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    createUserService = new CreateUserService(usersRepository)
  })

  it("Should be able to create a new user", async () => {
    const user: User = {
      name: "User Example",
      email: "user@example.com",
      password: "123456",
    }

    await createUserService.execute({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    const userCreated = usersRepository.findByEmail(user.email)

    expect(userCreated).toHaveProperty("id")
  })

  it("Should not be able to create a new user with same e-mail", async () => {
    const user: User = {
      name: "User Example",
      email: "user@example.com",
      password: "123456",
    }

    await createUserService.execute({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    expect(async () => {
      await createUserService.execute({
        name: user.name,
        email: user.email,
        password: user.password,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("Should be able to edit an existing user", async () => {
    const user: User = {
      name: "User Example",
      email: "user@example.com",
      password: "123456",
    }

    await createUserService.execute({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    const updatedUserData = {
      name: "User Example Test",
      email: "user@example.com.br",
    }

    const userCreated = usersRepository.findByEmail(user.email)
    const updatedUser = usersRepository.update({
      id: userCreated.id,
      name: updatedUserData.name,
      email: updatedUserData.email,
    })

    expect(updatedUser).not.toEqual(user)
  })

  it("Should be able to list all users", () => {
    const users = usersRepository.listAll()

    expect(users).toBeInstanceOf(Array)
  })

  it("Should be not able to find a non existing user", () => {
    const id = v4()

    const user = usersRepository.findById(id)
    expect(user).toBe(undefined)
  })
})
