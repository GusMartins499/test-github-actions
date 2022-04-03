import { Router } from "express"

import { UsersRepositoryInMemory } from "../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserService } from "../services/users/CreateUserService"
import { DeleteUserService } from "../services/users/DeleteUserService"
import { ListUsersService } from "../services/users/ListUsersService"
import { UpdateUserService } from "../services/users/UpdateUserService"

const usersRoutes = Router()

const usersRepository = new UsersRepositoryInMemory()

usersRoutes.post("/", async (request, response) => {
  const { name, email, password } = request.body

  const createUserService = new CreateUserService(usersRepository)

  await createUserService.execute({ name, email, password })

  return response.status(201).send()
})

usersRoutes.get("/", (request, response) => {
  const listUsersService = new ListUsersService(usersRepository)

  const users = listUsersService.execute()

  return response.json(users)
})

usersRoutes.put("/:id", (request, response) => {
  const { id } = request.params
  const { name, email } = request.body

  const updateUserService = new UpdateUserService(usersRepository)

  const userUpdated = updateUserService.execute({ id, name, email })

  return response.json(userUpdated)
})

usersRoutes.delete("/:id", (request, response) => {
  const { id } = request.params

  const deleteUserService = new DeleteUserService(usersRepository)

  deleteUserService.execute({ id })

  return response.status(200).send()
})

export { usersRoutes }
