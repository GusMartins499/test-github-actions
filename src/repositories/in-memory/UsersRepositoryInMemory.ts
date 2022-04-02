import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../model/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  create({ name, email, password }: ICreateUserDTO): void {
    const user = new User();
    Object.assign(user, { name, email, password });

    this.users.push(user);
  }
  findByEmail(email: string): User {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
  findById(id: string): User {
    const user = this.users.find((user) => user.id === id);

    return user;
  }
  listAll(): User[] {
    return this.users;
  }
}

export { UsersRepositoryInMemory };
