import { ICreateUserDTO } from "../dtos/ICreateUserDTO"
import { User } from "../model/User"

export interface IUsersRepository {
  create(data: ICreateUserDTO): void
  findByEmail(email: string): User
  findById(id: string): User
  listAll(): User[]
}
