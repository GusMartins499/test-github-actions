import { v4 } from "uuid"

class User {
  id?: string
  name: string
  email: string
  password: string

  constructor() {
    if (!this.id) {
      this.id = v4()
    }
  }
}

export { User }
