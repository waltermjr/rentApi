import MongoUserRespository from "../../../repositories/implementations/user/mongo";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const createUserUseCase = new CreateUserUseCase(MongoUserRespository)

export default new CreateUserController(createUserUseCase)