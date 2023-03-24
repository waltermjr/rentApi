import MongoUserModel from "./MongoUserModel";
import { MongoUserRespository } from "./MongoUserRepository";

export default new MongoUserRespository(MongoUserModel)