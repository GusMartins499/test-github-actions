import { AppError } from "../../erros/AppError";
import { User } from "../../model/User";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserService } from "../../services/users/CreateUserService";
import { ListUsersService } from "../../services/users/ListUsersService";

let createUserService: CreateUserService;
let listUserService: ListUsersService;
let usersRepository: UsersRepositoryInMemory;

describe("Create user", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(usersRepository);
  });

  it("Should be able to create a new user", async () => {
    const user: User = {
      name: "User Example",
      email: "user@example.com",
      password: "123456",
    };

    await createUserService.execute({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const userCreated = usersRepository.findByEmail(user.email);

    expect(userCreated).toHaveProperty("id");
  });

  it("Should not be able to create a new user with same e-mail", async () => {
    expect(async () => {
      const user: User = {
        name: "User Example",
        email: "user@example.com",
        password: "123456",
      };

      await createUserService.execute({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      await createUserService.execute({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
