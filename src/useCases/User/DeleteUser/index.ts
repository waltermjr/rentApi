import MongoUserRespository from "../../../repositories/implementations/user/mongo";
import { DeleteUserController } from "./DeleteUserController";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

const deleteUserUseCase = new DeleteUserUseCase(MongoUserRespository)

export default new DeleteUserController(deleteUserUseCase)