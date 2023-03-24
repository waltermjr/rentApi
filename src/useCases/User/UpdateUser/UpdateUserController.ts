import { Request, Response } from "express";
import { IController } from "../../protocols/IController";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController implements IController {
  constructor(
    private updateUserUseCase: UpdateUserUseCase
  ){}

  async handle(request: Request, response: Response): Promise<Response>{
    try {
      await this.updateUserUseCase.execute(request.body, request.params.id)
      return response.status(200).json({ message: "Usuário Editado com sucesso"})
    } catch(error) {
      return response.status(400).json({message: `${error} - erro ao editar usuário`})
    }
  }
}