import { AppError } from "../../erros/AppError"
import { User } from "../../model/User"
import { IUsersRepository } from "../../repositories/IUsersRepository"

interface IRequest {
  id: string
  name: string
  email: string
}

class UpdateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ id, name, email }: IRequest): User {
    const user = this.usersRepository.findById(id)

    if (!user) {
      throw new AppError("User not found")
    }

    const updatedUser = this.usersRepository.update({
      id,
      name,
      email,
    })

    return updatedUser
  }
}

export { UpdateUserService }
