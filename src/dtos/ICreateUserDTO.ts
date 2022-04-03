interface ICreateUserDTO {
  id?: string
  name: string
  email: string
  password: string
}

interface IUpdateUserDTO {
  id: string
  name: string
  email: string
}

export { ICreateUserDTO, IUpdateUserDTO }
