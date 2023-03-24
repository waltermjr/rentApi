import { Request, Response } from "express";
import { IController } from "../../protocols/IController";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController implements IController {
  constructor(
    private createUserUseCase: CreateUserUseCase
  ){}

  async handle(request: Request, response: Response): Promise<Response>{
    try{
      await this.createUserUseCase.execute(request.body)
      return response.status(201).json({message: `Usuário criado com sucesso`})
    } catch(error) {
      return response.status(400).json({message: `${error} - erro ao criar usuário`})
    }
  }
}