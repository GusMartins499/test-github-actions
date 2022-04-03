import { hash } from "bcrypt";
import { AppError } from "../../erros/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: IRequest): Promise<void> {
/*     const userAlreadyExists = this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    } */

    const passwordHash = await hash(password, 8);

    this.usersRepository.create({ name, email, password: passwordHash });
  }
}

export { CreateUserService };
