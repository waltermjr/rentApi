import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repositories/implementations/user/protocols/IUserRepository";
import { IUseCase } from "../../protocols/IUseCase";
import { IUserDTO } from "../protocols/UserDTO";

export class CreateUserUseCase implements IUseCase {
  constructor(
    private userRepository: IUserRepository
  ){}

  async execute(dataUser: IUserDTO): Promise<void | Error> {
    const isEmailRegistered = await this.userRepository.findByEmail(dataUser.email)
    if(isEmailRegistered.length > 0){
      throw new Error("Usuário já cadastrado")
    }
  
    const user = new User(dataUser)
    await this.userRepository.save(user)
  }
}