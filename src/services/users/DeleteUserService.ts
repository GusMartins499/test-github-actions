import { AppError } from "../../erros/AppError"
import { IUsersRepository } from "../../repositories/IUsersRepository"

interface IRequest {
  id: string
}

class DeleteUserService {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ id }: IRequest): void {
    const userAlreadyExists = this.usersRepository.findById(id)

    if (!userAlreadyExists) {
      throw new AppError("User not found")
    }

    this.usersRepository.delete(id)
  }
}

export { DeleteUserService }
