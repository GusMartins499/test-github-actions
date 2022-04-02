import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class ListUsersService {
  constructor(private usersRepository: IUsersRepository) {}

  execute(): User[] {
    return this.usersRepository.listAll();
  }
}

export { ListUsersService };
