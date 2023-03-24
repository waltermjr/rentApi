import MongoUserRespository from "../../../repositories/implementations/user/mongo";
import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { UpdateUserController } from "./UpdateUserController";

const updateUserUseCase = new UpdateUserUseCase(MongoUserRespository)

export default new UpdateUserController(updateUserUseCase)