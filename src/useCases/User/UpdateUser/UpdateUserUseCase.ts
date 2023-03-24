import { IUserRepository } from "../../../repositories/implementations/user/protocols/IUserRepository";
import { IUseCase } from "../../protocols/IUseCase";
import { IUserDTO } from "../protocols/UserDTO";

export class UpdateUserUseCase implements IUseCase{
  constructor(
    private userRepository: IUserRepository
  ){}

  async execute(dataUser: IUserDTO, id: string): Promise<void> {
    this.userRepository.update(id, dataUser)
  }
}