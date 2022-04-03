import { ICreateUserDTO, IUpdateUserDTO } from "../dtos/ICreateUserDTO"
import { User } from "../model/User"

export interface IUsersRepository {
  create(data: ICreateUserDTO): void
  update(data: IUpdateUserDTO): User
  delete(id: string): void
  findByEmail(email: string): User
  findById(id: string): User
  listAll(): User[]
}
