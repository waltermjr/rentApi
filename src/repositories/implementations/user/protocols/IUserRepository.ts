import { User } from "../../../../entities/User";

export interface IUserRepository {
  save(user: User): Promise<void>,
  update(id: string ,user: User): Promise<void>,
  delete(id: string): Promise<void>,
  findByEmail(email: string): Promise<User[]>,
  getAll(): Promise<User[]>,
  findById(id: string): Promise<User>
}