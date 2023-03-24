import { IUserRepository } from "../../../repositories/implementations/user/protocols/IUserRepository";
import { IUseCase } from "../../protocols/IUseCase";

export class DeleteUserUseCase implements IUseCase{
  constructor(
    private userRepository: IUserRepository
  ){}

  async execute(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}