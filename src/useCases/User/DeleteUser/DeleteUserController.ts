import { Request, Response } from "express";
import { IController } from "../../protocols/IController";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController implements IController {
  constructor(
    private deleteUserUseCase: DeleteUserUseCase
  ){}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      await this.deleteUserUseCase.execute(request.params.id)
      return response.status(200).json({message: "Usuário removido com sucesso"})
    } catch (error) {
      return response.status(400).json({message: `${error} - erro ao deletar usuário`})
    }
  }
}